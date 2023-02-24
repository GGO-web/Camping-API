import { Request, Response } from "express";

import { FeedbackService } from "../feedback.service";

export const createFeedback = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const message = req.body.message;

  const feedback = await FeedbackService.createFeedback(userId, message);

  return res.status(200).json(feedback);
}
