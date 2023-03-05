import { Request, Response } from "express";
import { asyncWrapper } from "../../../../helpers/asyncWrapper";
import { withController } from "../../../../helpers/withController";

import { TripService } from "../trip.service";

export const deactivateTrip = async (req: Request, res: Response) => {
  const { userId } = req.params;

  await TripService.deactivateTrip(userId);

  return res.json({ message: "Trip deactivated successfully" });
};

export default [
  withController("/deactivate/:userId", "patch", asyncWrapper(deactivateTrip))
];
