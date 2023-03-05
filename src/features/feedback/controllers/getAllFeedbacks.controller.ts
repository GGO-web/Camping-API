import { Request, Response } from "express";
import { asyncWrapper } from "../../../helpers/asyncWrapper";

import { withController } from "../../../helpers/withController";

import { FeedbackService } from "../feedback.service";

const getAllFeedbacks = async (_req: Request, res: Response) => {
  const feedbacks = await FeedbackService.getAllFeedbacks();

  return res.status(200).json(feedbacks);
};

export default [withController("/all/", "get", asyncWrapper(getAllFeedbacks))];
