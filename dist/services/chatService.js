import { MessageModel } from "../models/entities/messages.js"; // model do runtime
import { generateRoomId } from "../controllers/message.js";
export const getChatHistory = async (userId1, userId2) => {
    const room = generateRoomId(userId1, userId2);
    const messages = await MessageModel.find({ room }) // <- używamy modelu, nie typu
        .sort({ createdAt: -1 })
        .limit(50);
    return messages;
};
export const getUserChats = async (userId) => {
    const chats = await MessageModel.aggregate([
        {
            $match: {
                $or: [{ sender: userId }, { receiver: userId }],
            },
        },
        {
            $group: {
                _id: "$room",
                lastMessage: { $last: "$content" },
                lastMessageDate: { $last: "$createdAt" },
            },
        },
        { $sort: { lastMessageDate: -1 } },
    ]);
    return chats;
};
export const getRoomHistory = async (roomId) => {
    const messages = await MessageModel.find({ room: roomId })
        .sort({ createdAt: -1 })
        .limit(50);
    return messages;
};
//# sourceMappingURL=chatService.js.map