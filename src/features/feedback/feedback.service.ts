import { AppError } from "../../models/Error.model";
import { Feedback } from "./feedback.model";

import { UserService } from "../user/user.service";

export class FeedbackService {
  public static getAllFeedbacks = async () => {
    const feedbacks = await Feedback.find();

    return feedbacks;
  };

  public static getAllUserFeedbacks = async (userId: string) => {
    const user = await UserService.getUser(userId);

    if (!user) {
      throw new AppError("User is not found", 404);
    }

    const userFeedbacks = await Feedback.find({ userId });

    return userFeedbacks;
  };

  public static createFeedback = async (userId: string, message: string) => {
    const feedback = await Feedback.create({
      userId,
      message,
    });

    return feedback;
  };

  public static deleteFeedback = async (userId: string, feedbackId: string) => {
    const feedback = await Feedback.findOneAndDelete({
      _id: feedbackId,
      userId,
    });

    if (!feedback) {
      throw new Error("Feedback is not found or has been already deleted");
    }

    return feedback;
  };
}
