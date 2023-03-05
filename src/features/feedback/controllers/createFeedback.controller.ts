import { Request, Response } from "express";

import { IRouteConfig } from "../../../types/routeConfig.type";

import { FeedbackService } from "../feedback.service";

const createFeedback = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { message } = req.body;

  const feedback = await FeedbackService.createFeedback(userId, message);

  return res.status(200).json(feedback);
};

export default {
  route: createFeedback,
  method: "post",
  path: "/create",
} as IRouteConfig;
