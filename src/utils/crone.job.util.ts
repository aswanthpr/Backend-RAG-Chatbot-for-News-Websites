import cron from "node-cron";
import { runIngestion } from "../ingestion/index";
import { qdrantClient } from "../configs";

cron.schedule("0 10 * * *", async () => {
  try {
    const qdrant = await qdrantClient();
    if (!qdrant) return;
    console.log("🕙 Running daily ingestion job...");
    await qdrant.delete("news_articles", { filter: {} });
    await runIngestion();
  } catch (error) {
    console.error("Error in daily ingestion job:", error);
  }
}, {
  timezone: "Asia/Kolkata"
});