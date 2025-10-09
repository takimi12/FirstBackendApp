import { model, Schema } from "mongoose";
import type { InferSchemaType } from "mongoose";

const reviewSchema = new Schema({
  name: { type: String, maxLength: 100, required: true },
  email: { type: String, maxLength: 100, required: true },
  message: { type: String, maxLength: 1000, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Date, default: Date.now },
  accepted: { type: Boolean, default: false },
  productId: { type: String, required: true },
});

export const ReviewSchema = model("Review", reviewSchema);

export type Review = InferSchemaType<typeof reviewSchema>;
