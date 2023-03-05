import { Request, Response } from "express";
import { IRouteConfig } from "../../../../types/routeConfig.type";

import { ActivityService } from "../activity.service";

export const deleteActivity = async (
  req: Request<any, any, { userId: string; activityId: string }, any>,
  res: Response
) => {
  const { userId, activityId } = req.query;

  await ActivityService.deleteActivity(userId, activityId);

  return res.json({
    message: `Activity with id ${activityId} has been deleted successfully`,
  });
};

export default {
  route: deleteActivity,
  method: "delete",
  path: "/delete",
} as IRouteConfig;
