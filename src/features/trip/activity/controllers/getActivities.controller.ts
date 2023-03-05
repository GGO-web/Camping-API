import { Request, Response } from "express";
import { asyncWrapper } from "../../../../helpers/asyncWrapper";

import { withController } from "../../../../helpers/withController";

import { TripService } from "../../index/trip.service";

const getActivities = async (
  req: Request<{ userId: string }>,
  res: Response
) => {
  const { userId } = req.params;

  const trip = await TripService.getActivatedTrip(userId);

  return res.json(trip.activities);
};

export default [
  withController("/all/:userId", "get", asyncWrapper(getActivities))
];
