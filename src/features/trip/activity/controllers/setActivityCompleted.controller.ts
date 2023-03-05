import { Request, Response } from "express";
import { asyncWrapper } from "../../../../helpers/asyncWrapper";

import { withController } from "../../../../helpers/withController";

import { ActivityService } from "../activity.service";

export const setActivityCompleted = async (req: Request, res: Response) => {
  const { userId, activityId } = req.body;

  await ActivityService.setActivityCompleted(userId, activityId);

  return res.json({
    message: `Activity with id ${activityId} has been completed successfully`
  });
};

export default [
  withController("/complete", "patch", asyncWrapper(setActivityCompleted))
];
