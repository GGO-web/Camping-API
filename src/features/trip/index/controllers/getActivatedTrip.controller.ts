import { Request, Response } from "express";
import { asyncWrapper } from "../../../../helpers/asyncWrapper";
import { withController } from "../../../../helpers/withController";

import { TripService } from "../trip.service";

export const getActivatedTrip = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const trip = await TripService.getActivatedTrip(userId);

  return res.json(trip);
};

export default [
  withController("/activated/:userId", "get", asyncWrapper(getActivatedTrip))
];
