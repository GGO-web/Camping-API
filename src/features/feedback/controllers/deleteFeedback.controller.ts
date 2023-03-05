import { Request, Response } from "express";
import { asyncWrapper } from "../../../helpers/asyncWrapper";

import { withController } from "../../../helpers/withController";

import { FeedbackService } from "../feedback.service";

const deleteFeedback = async (
  req: Request<any, any, any, { userId: string; feedbackId: string }>,
  res: Response
) => {
  const { userId } = req.query;
  const { feedbackId } = req.query;

  const feedback = await FeedbackService.deleteFeedback(userId, feedbackId);

  return res.status(200).json(feedback);
};

export default [
  withController("/delete", "delete", asyncWrapper(deleteFeedback))
];
