import { Request, Response } from "express";
import { IRouteConfig } from "../../../../types/routeConfig.type";

import { ActivityService } from "../activity.service";

export const setActivityCompleted = async (req: Request, res: Response) => {
  const { userId, activityId } = req.body;

  await ActivityService.setActivityCompleted(userId, activityId);

  return res.json({
    message: `Activity with id ${activityId} has been completed successfully`,
  });
};

export default {
  route: setActivityCompleted,
  method: "patch",
  path: "/complete",
} as IRouteConfig;
