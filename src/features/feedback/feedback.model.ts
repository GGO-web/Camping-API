import { model, Schema } from "mongoose";

export interface IFeedback {
  userId: string;
  message: string;
  createdAt: Date;
}

const feedbackSchema = new Schema<IFeedback>({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const Feedback = model<IFeedback>("Feedback", feedbackSchema);
