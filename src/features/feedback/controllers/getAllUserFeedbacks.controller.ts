import { Request, Response } from "express";
import { asyncWrapper } from "../../../helpers/asyncWrapper";

import { withController } from "../../../helpers/withController";

import { FeedbackService } from "../feedback.service";

const getAllUserFeedbacks = async (
  req: Request<{ userId: string }>,
  res: Response
) => {
  const { userId } = req.params;

  const userFeedbacks = await FeedbackService.getAllUserFeedbacks(userId);

  return res.status(200).json(userFeedbacks);
};

export default [
  withController("/:userId", "get", asyncWrapper(getAllUserFeedbacks))
];
