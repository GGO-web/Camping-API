import { model, Schema, SchemaOptions } from "mongoose";

export interface IBagItem {
  desciption: string;
  image?: string; // base64 image format
  userId: string;
}

const bagSchema = new Schema<IBagItem>({
  // _id field is predefined by mongoose
  desciption: { type: String, required: true },
  image: { type: String }, // image is optional
  userId: { type: String, required: true },
});

export const Bag = model("bag", bagSchema);
