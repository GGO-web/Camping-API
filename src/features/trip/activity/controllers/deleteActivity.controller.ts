import { Request, Response } from "express";
import { asyncWrapper } from "../../../../helpers/asyncWrapper";

import { withController } from "../../../../helpers/withController";

import { ActivityService } from "../activity.service";

export const deleteActivity = async (
  req: Request<any, any, { userId: string; activityId: string }, any>,
  res: Response
) => {
  const { userId, activityId } = req.query;

  await ActivityService.deleteActivity(userId, activityId);

  return res.json({
    message: `Activity with id ${activityId} has been deleted successfully`
  });
};

export default [
  withController("/delete", "delete", asyncWrapper(deleteActivity))
];
