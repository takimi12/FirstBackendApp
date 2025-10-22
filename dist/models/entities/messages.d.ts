import mongoose from "mongoose";
import type { InferSchemaType } from "mongoose";
declare const messageSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    sender: string;
    receiver: string;
    content: string;
    room: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    sender: string;
    receiver: string;
    content: string;
    room: string;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    sender: string;
    receiver: string;
    content: string;
    room: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const MessageModel: mongoose.Model<{
    createdAt: NativeDate;
    sender: string;
    receiver: string;
    content: string;
    room: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    sender: string;
    receiver: string;
    content: string;
    room: string;
}, {}, mongoose.DefaultSchemaOptions> & {
    createdAt: NativeDate;
    sender: string;
    receiver: string;
    content: string;
    room: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    sender: string;
    receiver: string;
    content: string;
    room: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    sender: string;
    receiver: string;
    content: string;
    room: string;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    sender: string;
    receiver: string;
    content: string;
    room: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export type Message = InferSchemaType<typeof messageSchema>;
export {};
//# sourceMappingURL=messages.d.ts.map