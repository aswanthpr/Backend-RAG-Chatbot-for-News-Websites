import { getEmbedding } from "../integration/index";
import { getQdrant } from "../configs/index";
import { chunkText, fetchRSSFeed } from "./index";
import pLimit from "p-limit";
import { uuidGen } from "../utils/index";

// Main Ingestion
const limit  = pLimit(3);
export async function runIngestion(): Promise<void> {
  const qdrant = getQdrant();

  const articles = await fetchRSSFeed(process.env["RSS_FEED_URL"]!);
    if (!articles || articles.length === 0) {
    console.log("⚠️ No articles fetched.");
    return;
  }
  const batch: Promise<void>[] = [];

  for (const article of articles.slice(0, 50)) {
    const chunks = await chunkText(article?.content);
      for (const chunk of chunks) {
      batch.push(
        limit(async () => {
          const vector = await getEmbedding(chunk);

            await qdrant.upsert("news_articles", {
            points: [
              {
                id: uuidGen(),
                vector,
                payload: {
                  title: article.title,
                  link: article.link,
                  text: chunk,
                },
              },
            ],
          });
        })
      );
    }
  }

  await Promise.all(batch);

  console.log("✅ Ingestion complete with concurrency limit");
}