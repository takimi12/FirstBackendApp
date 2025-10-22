
import mongoose from "mongoose";
import type { InferSchemaType } from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  content: { type: String, required: true },
  room: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const MessageModel = mongoose.model("Message", messageSchema); // <- model runtime
export type Message = InferSchemaType<typeof messageSchema>; // <- typ TS
