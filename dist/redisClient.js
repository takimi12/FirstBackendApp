// redisClient.ts
import { createClient } from "redis";
export const redisClient = createClient();
redisClient.on("connect", () => {
    console.log("✅ Connected to Redis...");
});
redisClient.on("error", (err) => {
    console.error("❌ Redis error:", err);
});
export async function initRedis() {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
}
//# sourceMappingURL=redisClient.js.map