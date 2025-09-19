import {
  COLLECTION,
  HISTORY_TTL,
  MAX_HISTORY_ITEMS,
  TOP_K,
} from "../constants";
import { getQdrant, redis } from "../configs";
import { IChatMessage } from "../types/types";
import { callGemini, getEmbedding } from "../integration";
import { uuidGen } from "../utils";

export async function searchTopK(queryVector: number[], k = TOP_K) {
  try {
    const qdrant = await getQdrant();

    // The client library signature can vary; adapt if necessary
    const res = await qdrant.search(COLLECTION, {
      vector: queryVector,
      limit: k,
      with_payload: true,
      with_vector: false,
    });
    // Normalize to array of {score, payload.text, payload.title, payload.link}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return res.map((hit: any) => ({
      score: hit.score,
      text: hit.payload?.text ?? "",
      title: hit.payload?.title ?? "",
      link: hit.payload?.link ?? "",
    }));
  } catch (err) {
    console.log(err instanceof Error ? err : String(err));
    return [];
  }
}

// 2) Build a prompt for llms
export function buildPrompt(
  userQuestion: string,
  docs: Array<{ score: number; text: string; title?: string; link?: string }>
) {
  // Keep context concise: include top passages with source attribution
  const contextParts = docs
    .map(
      (d, i) =>
        `Source ${i + 1} (${d.title ?? "no-title"}${
          d.link ? `, ${d.link}` : ""
        }):\n${d.text}`
    )
    .join("\n\n---\n\n");

  const prompt = `

Context:
${contextParts}

User question:
${userQuestion}

Answer concisely and cite the sources by "Source N" where relevant.
`;

  return prompt;
}

//  persist message to redis list and trim + refresh TTL
export async function pushToSessionHistory(
  sessionId: string,
  msg: IChatMessage
) {
  try {
    const key = `session:${sessionId}`;

    const raw = await redis?.get(key);
    let history: IChatMessage[] = [];

    if (raw) {
      history = JSON.parse(raw) as IChatMessage[];
    }
    history.push(msg);

    await redis?.set(key, JSON.stringify(history), "EX", HISTORY_TTL);;

    if (history.length > MAX_HISTORY_ITEMS) {
      history.splice(0, history.length - MAX_HISTORY_ITEMS);
    }
    // trim history to last MAX_HISTORY_ITEMS
    // refresh TTL


  } catch (err: unknown) {
    console.log(err instanceof Error ? err : String(err));
  }
}

// 5) the end-to-end handler
export async function generateAIResponse(sessionId: string, userText: string) {
  try {
    // store user message first
    const userMsg: IChatMessage = {
      id: uuidGen(),
      sender: "user",
      text: userText,
      timestamp: Date.now(),
    };

    await pushToSessionHistory(sessionId, userMsg);

    // 1) embed user query
    const vector = await getEmbedding(userText);
    if (!vector || vector.length === 0) {
      throw new Error("Failed to get embedding");
    }

    // 2) search top-k passages
    const docs = await searchTopK(vector, TOP_K);

    // 3)call Gemini
    const prompt: string = buildPrompt(userText, docs);
    const aiText = await callGemini(prompt);

    // 4) store AI reply
    const aiMsg: IChatMessage = {
      id: uuidGen(),
      sender: "ai",
      text: aiText as string,
      timestamp: Date.now(),
    };
 
    await pushToSessionHistory(sessionId, aiMsg);


    return { aiText, sources: docs.slice(0, 3) };
  } catch (err) {
    console.log(err instanceof Error ? err : String(err));
    return {};
  }
}
