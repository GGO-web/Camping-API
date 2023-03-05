import { Request, Response } from "express";
import { asyncWrapper } from "../../../helpers/asyncWrapper";

import { withController } from "../../../helpers/withController";

import { NotificationService } from "../notification.service";

export const getAllNotifications = async (req: Request, res: Response) => {
  const { userId } = req.params;

  console.log("userId", userId);

  const notifications = await NotificationService.getAllNotifications(userId);

  return res.status(200).json(notifications);
};

export default [
  withController("/all/:userId", "get", asyncWrapper(getAllNotifications))
];
