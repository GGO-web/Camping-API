import { Request, Response } from "express";
import { INotification } from "../models/Notification.model";

import { NotificationService } from "../services/NotificationService";

export const getAllNotifications = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const notifications = await NotificationService.getAllNotifications(userId);
  
  return res.status(200).json(notifications);
};

export const createNotification = async (req: Request<any, INotification, any, any>, res: Response) => {
  const notification = req.body;

  const createdNotification = await NotificationService.createNotification(notification);

  return res.status(200).json(createdNotification);
}

export const deleteNotification = async (req: Request, res: Response) => {
  const { id } = req.params;

  await NotificationService.deleteNotification(id);

  return res.status(200).json({
    message: "Notification has been deleted successfully"
  });
}
