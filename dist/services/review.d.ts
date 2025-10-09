import type { Review } from "../schemas/review.js";
declare class ReviewService {
    validateRating(rating: number): void;
    validateReview(review: Review): Promise<void>;
    create(review: Omit<Review, "accepted" | "createdAt">): Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        createdAt: NativeDate;
        productId: string;
        message: string;
        email: string;
        rating: number;
        accepted: boolean;
    }, {}, import("mongoose").DefaultSchemaOptions> & {
        name: string;
        createdAt: NativeDate;
        productId: string;
        message: string;
        email: string;
        rating: number;
        accepted: boolean;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        createdAt: NativeDate;
        productId: string;
        message: string;
        email: string;
        rating: number;
        accepted: boolean;
    }, {}, import("mongoose").DefaultSchemaOptions> & {
        name: string;
        createdAt: NativeDate;
        productId: string;
        message: string;
        email: string;
        rating: number;
        accepted: boolean;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(options?: {
        page?: number;
        limit?: number;
        accepted?: boolean;
    }): Promise<{
        reviews: {
            name: string;
            createdAt: NativeDate;
            productId: string;
            message: string;
            email: string;
            rating: number;
            accepted: boolean;
        }[];
        pagination: {
            total: number;
            page: number;
            pages: number;
        };
    }>;
    findByProductId(productId: string): Promise<(import("mongoose").Document<unknown, {}, {
        name: string;
        createdAt: NativeDate;
        productId: string;
        message: string;
        email: string;
        rating: number;
        accepted: boolean;
    }, {}, import("mongoose").DefaultSchemaOptions> & {
        name: string;
        createdAt: NativeDate;
        productId: string;
        message: string;
        email: string;
        rating: number;
        accepted: boolean;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    update(id: string, review: Partial<Review>): Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        createdAt: NativeDate;
        productId: string;
        message: string;
        email: string;
        rating: number;
        accepted: boolean;
    }, {}, import("mongoose").DefaultSchemaOptions> & {
        name: string;
        createdAt: NativeDate;
        productId: string;
        message: string;
        email: string;
        rating: number;
        accepted: boolean;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    acceptReview(id: string): Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        createdAt: NativeDate;
        productId: string;
        message: string;
        email: string;
        rating: number;
        accepted: boolean;
    }, {}, import("mongoose").DefaultSchemaOptions> & {
        name: string;
        createdAt: NativeDate;
        productId: string;
        message: string;
        email: string;
        rating: number;
        accepted: boolean;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        createdAt: NativeDate;
        productId: string;
        message: string;
        email: string;
        rating: number;
        accepted: boolean;
    }, {}, import("mongoose").DefaultSchemaOptions> & {
        name: string;
        createdAt: NativeDate;
        productId: string;
        message: string;
        email: string;
        rating: number;
        accepted: boolean;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteByProductId(productId: string): Promise<import("mongodb").DeleteResult>;
}
export default ReviewService;
//# sourceMappingURL=review.d.ts.map