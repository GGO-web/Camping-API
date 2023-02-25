import { Request, Response } from "express";

import { NotificationService } from "../notification.service";

import { INotification } from "../notification.model";

export const createNotification = async (
  req: Request<any, INotification, any, any>,
  res: Response
) => {
  const notification = req.body;

  const createdNotification = await NotificationService.createNotification(
    notification
  );

  return res.status(200).json(createdNotification);
};
