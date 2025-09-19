import { Redis } from "ioredis";

export let redis: Redis | null = null;
export const redisClient = (): Redis => {
  if (!redis) {
  redis =  new Redis(process.env["REDIS_URL"]!,{
    db: 0,
    lazyConnect: false,
    connectTimeout: 10000,
    maxRetriesPerRequest: 5,
  })

    .on("connect", () => {
      console.log("✅ Redis connected successfully");
    })
    .on("error", (err) => {
      console.error("❌ Redis connection error:", err);
    });
  }
    return redis ?? null;
};


