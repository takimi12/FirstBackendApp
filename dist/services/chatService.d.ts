export declare const getChatHistory: (userId1: string, userId2: string) => Promise<(import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    sender: string;
    receiver: string;
    content: string;
    room: string;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    createdAt: NativeDate;
    sender: string;
    receiver: string;
    content: string;
    room: string;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
})[]>;
export declare const getUserChats: (userId: string) => Promise<any[]>;
export declare const getRoomHistory: (roomId: string) => Promise<(import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    sender: string;
    receiver: string;
    content: string;
    room: string;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    createdAt: NativeDate;
    sender: string;
    receiver: string;
    content: string;
    room: string;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
})[]>;
//# sourceMappingURL=chatService.d.ts.map