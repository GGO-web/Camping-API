import { Request, Response } from "express";
import { IRouteConfig } from "../../../types/routeConfig.type";

import { NotificationService } from "../notification.service";

export const deleteNotification = async (req: Request, res: Response) => {
  const { id } = req.params;

  await NotificationService.deleteNotification(id);

  return res.status(200).json({
    message: "Notification has been deleted successfully"
  });
};

export default {
  route: deleteNotification,
  method: "delete",
  path: "/delete/:id"
} as IRouteConfig;
