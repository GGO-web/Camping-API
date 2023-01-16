import { model, Schema } from "mongoose";

export interface ILocationImage {
  url: string;
  [key: string]: any;
}

export interface ILocation {
  name: string;
  description: string;
  images?: ILocationImage[];
  address?: string;
  [key: string]: any;
}

const locationSchema = new Schema<ILocation>({
  // _id field is predefined by mongoose
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: Array<ILocationImage>, required: true },
  address: { type: String },
});

export const Location = model("locations", locationSchema);
