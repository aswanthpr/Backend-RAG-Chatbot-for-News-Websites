import cron from "node-cron";
import { runIngestion } from "../ingestion/index";
import { qdrantClient } from "../configs";

cron.schedule("0 10 * * *", async () => {
  const qdrant = await qdrantClient();
  if (!qdrant) return;
  console.log("🕙 Running daily ingestion job...");
  await qdrant.delete("news_articles", { filter: {} });
  await runIngestion();
});