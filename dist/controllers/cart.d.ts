import type { Response } from "express";
import type { AuthRequest } from "../middlewares/isAuth.js";
export declare const getUserCart: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addToCart: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const removeFromCart: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=cart.d.ts.map