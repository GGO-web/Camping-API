import { Request, Response } from "express";
import { IRouteConfig } from "../../../../types/routeConfig.type";

import { IActivity } from "../activity.model";

import { ActivityService } from "../activity.service";

export const addActivity = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const activity = req.body as IActivity;

  await ActivityService.addActivity(userId, activity);

  return res.json({ message: "Activity added successfully" });
};

export default {
  route: addActivity,
  method: "post",
  path: "/:userId",
} as IRouteConfig;
