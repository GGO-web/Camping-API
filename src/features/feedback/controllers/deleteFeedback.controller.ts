import { Request, Response } from "express";
import { IRouteConfig } from "../../../types/routeConfig.type";

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

export default {
  route: deleteFeedback,
  method: "delete",
  path: "/delete"
} as IRouteConfig;
