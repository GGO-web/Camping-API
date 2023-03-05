import { Request, Response } from "express";
import { asyncWrapper } from "../../../helpers/asyncWrapper";
import { withController } from "../../../helpers/withController";

import { FeedbackService } from "../feedback.service";

const createFeedback = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { message } = req.body;

  const feedback = await FeedbackService.createFeedback(userId, message);

  return res.status(200).json(feedback);
};

export default [
  withController("/create", "post", asyncWrapper(createFeedback))
];
