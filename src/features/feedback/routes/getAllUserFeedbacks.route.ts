import { Request, Response } from "express";

import { FeedbackService } from "../feedback.service";

export const getAllUserFeedbacks = async (req: Request<{userId: string}>, res: Response) => {
  const userId = req.params.userId;

  const userFeedbacks = await FeedbackService.getAllUserFeedbacks(userId);

  return res.status(200).json(userFeedbacks);
}
