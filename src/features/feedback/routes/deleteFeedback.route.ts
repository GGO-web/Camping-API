import { Request, Response } from "express";

import { FeedbackService } from "../feedback.service";

const deleteFeedback = async (
  req: Request<any, any, any, { userId: string; feedbackId: string }>,
  res: Response
) => {
  const userId = req.query.userId;
  const feedbackId = req.query.feedbackId;

  const feedback = await FeedbackService.deleteFeedback(userId, feedbackId);

  return res.status(200).json(feedback);
};


export default {
  route: deleteFeedback,
  method: "delete",
  path: "/delete",
}
