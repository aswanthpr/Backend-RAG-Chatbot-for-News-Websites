export const PROMPT = `
You are a helpful assistant. Use the provided news passages to answer the user's question accurately.
Do NOT hallucinate; if info is missing, say "I don't know". response should be in polite manner 
if the answer is point divide each line with point and Include imongies to make attractive separate with lines if necessary 
`

export const COLLECTION ="news_articles";
export const TOP_K =5;
export const HISTORY_TTL = 60 * 60 * 12; // 24 hours
export const MAX_HISTORY_ITEMS = 100; // keep last N messages
