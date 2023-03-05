import { Request, Response } from "express";
import { asyncWrapper } from "../../../../helpers/asyncWrapper";
import { withController } from "../../../../helpers/withController";

import { TripService } from "../trip.service";

export const activateTrip = async (req: Request, res: Response) => {
  const { userId, tripId } = req.body;

  await TripService.activateTrip(userId, tripId);

  return res.json({ message: "Trip activated successfully" });
};

export default [
  withController("/activate", "patch", asyncWrapper(activateTrip))
];
