import { Request, Response } from "express";
import { asyncWrapper } from "../../../../helpers/asyncWrapper";

import { withController } from "../../../../helpers/withController";

import { IActivity } from "../activity.model";

import { ActivityService } from "../activity.service";

export const addActivity = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const activity = req.body as IActivity;

  await ActivityService.addActivity(userId, activity);

  return res.json({ message: "Activity added successfully" });
};

export default [withController("/:userId", "post", asyncWrapper(addActivity))];
