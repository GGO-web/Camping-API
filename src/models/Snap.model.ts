import { Document, model, Schema } from "mongoose";

export interface ISnap extends Document {
  userId: string;
  image: string; // base64 image format
}

const snapSchema = new Schema<ISnap>({
  userId: { type: String, required: true },
  image: { type: String, required: true },
});

export const Snap = model<ISnap>("Snap", snapSchema);
