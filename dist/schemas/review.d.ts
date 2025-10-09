import { Schema } from "mongoose";
import type { InferSchemaType } from "mongoose";
declare const reviewSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    createdAt: NativeDate;
    productId: string;
    message: string;
    email: string;
    rating: number;
    accepted: boolean;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    createdAt: NativeDate;
    productId: string;
    message: string;
    email: string;
    rating: number;
    accepted: boolean;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    name: string;
    createdAt: NativeDate;
    productId: string;
    message: string;
    email: string;
    rating: number;
    accepted: boolean;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const ReviewSchema: import("mongoose").Model<{
    name: string;
    createdAt: NativeDate;
    productId: string;
    message: string;
    email: string;
    rating: number;
    accepted: boolean;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
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
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    createdAt: NativeDate;
    productId: string;
    message: string;
    email: string;
    rating: number;
    accepted: boolean;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    createdAt: NativeDate;
    productId: string;
    message: string;
    email: string;
    rating: number;
    accepted: boolean;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    name: string;
    createdAt: NativeDate;
    productId: string;
    message: string;
    email: string;
    rating: number;
    accepted: boolean;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export type Review = InferSchemaType<typeof reviewSchema>;
export {};
//# sourceMappingURL=review.d.ts.map