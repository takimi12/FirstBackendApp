import type { Request, Response, NextFunction } from "express";
export declare const cacheMiddleware: (keyGenerator: (req: Request) => string, ttl?: number) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=cache.d.ts.map