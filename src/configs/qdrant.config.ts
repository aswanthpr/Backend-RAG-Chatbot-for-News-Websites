import { QdrantClient } from "@qdrant/js-client-rest";

let qdrant: QdrantClient | null = null;

export async function qdrantClient() {
  try {
    if (!qdrant) {
      qdrant = new QdrantClient({
        url: process.env["QDRANT_HOST"] as string,
        apiKey: process.env["QDRANT_API"] as string,
      });
      console.log("✅ Qdrant client initialized");
    }
    return qdrant;
  } catch (error: unknown) {
    console.log(error instanceof Error ? error : String(error));
    return null;
  }
}
export const getQdrant = (): QdrantClient => {
  if (!qdrant)
    throw new Error("Qdrant client not initialized. Call initQdrant first.");
  return qdrant;
};

export const initQdrant = async () => {
  const exists = await qdrant?.getCollections();
  const names = exists?.collections.map((c) => c.name);

  if (!names?.includes("news_articles")) {
    console.log("📦 Creating Qdrant collection...");
    await qdrant?.createCollection("news_articles", {
      vectors: {
        size: 768, // match your embedding model output dimension
        distance: "Cosine",
      },
    });
  } else {
    console.log("✅ Collection already exists");
  }
};
