import { Request, Response } from "express";
import { IRouteConfig } from "../../../types/routeConfig.type";

import { FeedbackService } from "../feedback.service";

const getAllUserFeedbacks = async (
  req: Request<{ userId: string }>,
  res: Response
) => {
  const { userId } = req.params;

  const userFeedbacks = await FeedbackService.getAllUserFeedbacks(userId);

  return res.status(200).json(userFeedbacks);
};

export default {
  route: getAllUserFeedbacks,
  method: "get",
  path: "/:userId",
} as IRouteConfig;
