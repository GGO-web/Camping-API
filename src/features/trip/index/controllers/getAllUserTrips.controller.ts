import { Request, Response } from "express";
import { asyncWrapper } from "../../../../helpers/asyncWrapper";
import { withController } from "../../../../helpers/withController";

import { TripService } from "../trip.service";

export const getAllUserTrips = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const trips = await TripService.getAllUserTrips(userId);

  return res.json(trips);
};

export default [
  withController("/all/:userId", "get", asyncWrapper(getAllUserTrips))
];
