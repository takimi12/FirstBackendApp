import { redisClient } from "../redisClient.js";
import { CACHE_KEYS } from "../constans/cacheKeys.js";
export const cacheMiddleware = (keyGenerator, ttl = 3600) => {
    return async (req, res, next) => {
        try {
            const key = keyGenerator(req);
            if (!redisClient.isOpen) {
                console.warn("⚠️ Redis client is not connected — skipping cache");
                return next();
            }
            const cachedData = await redisClient.get(key);
            if (cachedData) {
                console.log(`✅ Cache hit: ${key}`);
                return res.json(JSON.parse(cachedData));
            }
            // Nadpisujemy res.json, aby zapisać dane do cache przed wysłaniem odpowiedzi
            const originalJson = res.json.bind(res);
            res.json = (body) => {
                redisClient
                    .setEx(key, ttl, JSON.stringify(body))
                    .then(() => console.log(`💾 Cached response for key: ${key}`))
                    .catch((err) => console.error("❌ Redis setEx error:", err));
                return originalJson(body);
            };
            next();
        }
        catch (error) {
            console.error("❌ Redis middleware error:", error);
            next(); // Jeśli coś nie działa w Redis, nie blokujemy endpointu
        }
    };
};
//# sourceMappingURL=cache.js.map