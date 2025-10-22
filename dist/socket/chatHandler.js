// src/services/chatSocket.ts
import { Server, Socket } from "socket.io";
import { MessageModel } from "../models/entities/messages.js"; // Twój Mongoose model
import admin from "firebase-admin";
const connectedUsers = new Map();
// Generowanie deterministycznego ID pokoju dla dwóch użytkowników
export const generateRoomId = (userA, userB) => {
    return [userA, userB].sort().join("_");
};
export const registerChatSocketHandlers = (io) => {
    // //  Middleware w socket.io do autoryzacji
    //   io.use(async (socket, next) => {
    //     try {
    //       const authHeader = socket.request.headers.authorization;
    //       if (!authHeader) {
    //         throw new Error("No auth token found");
    //       }
    //       const decodedToken = await admin.auth().verifyIdToken(authHeader);
    //       socket.data.userId = decodedToken.uid;
    //       next();
    //     } catch (error) {
    //       next(new Error("Authentication error"));
    //     }
    //   });
    // Middleware do autoryzacji (lub tryb testowy)
    // io.use(async (socket, next) => {
    //   const authHeader = socket.request.headers.authorization;
    //   if (!authHeader) {
    //     console.log("⚠️ Brak tokenu — tryb testowy (Postman)");
    //     socket.data.userId = "test-user";
    //     return next();
    //   }
    //   try {
    //     const decodedToken = await admin.auth().verifyIdToken(authHeader);
    //     socket.data.userId = decodedToken.uid;
    //     next();
    //   } catch (error) {
    //     next(new Error("Authentication error"));
    //   }
    // });
    io.use(async (socket, next) => {
        const authHeader = socket.request.headers.authorization;
        const queryUser = socket.handshake.query.user; // <-- pobieramy usera z URL-a
        if (!authHeader) {
            // jeśli nie ma tokenu, ale jest ?user= w URL — użyj go
            if (queryUser) {
                console.log(`⚠️ Brak tokenu — tryb testowy (Postman) jako ${queryUser}`);
                socket.data.userId = queryUser;
                return next();
            }
            // w innym wypadku generuj losowy test-user
            const randomId = "test-user-" + Math.floor(Math.random() * 10000);
            console.log(`⚠️ Brak tokenu — tryb testowy (Postman) jako ${randomId}`);
            socket.data.userId = randomId;
            return next();
        }
        try {
            // jeśli klient ma token Firebase, normalnie go weryfikujemy
            const decodedToken = await admin.auth().verifyIdToken(authHeader);
            socket.data.userId = decodedToken.uid;
            next();
        }
        catch (error) {
            next(new Error("Authentication error"));
        }
    });
    io.on("connection", (socket) => {
        const userId = socket.data.userId;
        console.log(`User connected: ${userId}`);
        connectedUsers.set(socket.id, { socketId: socket.id, userId });
        // =====================
        // Dołączanie do pokoju
        // =====================
        socket.on("join_room", async (otherUserId) => {
            if (!otherUserId)
                return;
            const previousRoom = connectedUsers.get(socket.id)?.room;
            if (previousRoom)
                socket.leave(previousRoom);
            const room = generateRoomId(userId, otherUserId);
            socket.join(room);
            connectedUsers.set(socket.id, { socketId: socket.id, userId, room });
            try {
                const messages = await MessageModel.find({ room })
                    .sort({ createdAt: 1 }) // od najstarszych do najnowszych
                    .limit(50);
                // Emitujemy historię wiadomości tylko do nadawcy
                socket.emit("message_history", messages);
                console.log(`User ${userId} joined room ${room}, loaded ${messages.length} messages`);
            }
            catch (error) {
                console.error("Error fetching messages:", error);
                socket.emit("message_history", []);
            }
        });
        // =====================
        // Wysyłanie wiadomości
        // =====================
        socket.on("send_message", async (data) => {
            const sender = userId;
            const { content, receiver } = data;
            // Walidacja
            if (!content || !receiver) {
                console.warn("send_message: brak content lub receiver", data);
                return;
            }
            const room = generateRoomId(sender, receiver);
            try {
                const message = new MessageModel({
                    sender,
                    receiver,
                    content,
                    room,
                    createdAt: new Date(),
                });
                await message.save();
                const savedMessage = {
                    messageId: message._id,
                    sender,
                    receiver,
                    content,
                    room,
                    createdAt: message.createdAt,
                };
                console.log("savedMessage", savedMessage);
                // Emitujemy do wszystkich w pokoju (nadawca + odbiorca)
                io.to(room).emit("chat_message", savedMessage);
            }
            catch (error) {
                console.error("Error saving message:", error);
            }
        });
        // =====================
        // Rozłączenie
        // =====================
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${userId}`);
            connectedUsers.delete(socket.id);
        });
    });
};
//# sourceMappingURL=chatHandler.js.map