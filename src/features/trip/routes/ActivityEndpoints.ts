import { Request, Response } from "express";

import { TripService } from "../trip.service";

import { ActivityService } from "../services/activity.service";

import { IActivity } from "../../../models/Activity.model";

// Activity endpoints
export const getActivities = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const trip = await TripService.getActivatedTrip(userId);

  return res.json(trip.activities);
};

export const addActivity = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const activity = req.body as IActivity;

  await ActivityService.addActivity(userId, activity);

  return res.json({ message: "Activity added successfully" });
};

export const setActivityCompleted = async (req: Request, res: Response) => {
  const { userId, activityId } = req.body;

  await ActivityService.setActivityCompleted(userId, activityId);

  return res.json({
    message: `Activity with id ${activityId} has been completed successfully`,
  });
};

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
