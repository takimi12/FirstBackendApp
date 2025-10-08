import type { Request, Response, NextFunction } from "express";
import admin from "../config/firebase.js";
export interface AuthRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}
export declare const verifyToken: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=isAuth.d.ts.map