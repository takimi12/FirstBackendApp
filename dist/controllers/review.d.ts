import type { Request, Response } from "express";
export declare const createReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getReviews: (req: Request, res: Response) => Promise<void>;
export declare const getReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const acceptReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=review.d.ts.map