import { Request, Response } from "express";

import { NotificationService } from "../notification.service";

export const deleteNotification = async (req: Request, res: Response) => {
  const { id } = req.params;

  await NotificationService.deleteNotification(id);

  return res.status(200).json({
    message: "Notification has been deleted successfully"
  });
}
