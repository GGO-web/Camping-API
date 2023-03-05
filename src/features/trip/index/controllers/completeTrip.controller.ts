import { Request, Response } from "express";
import { asyncWrapper } from "../../../../helpers/asyncWrapper";
import { withController } from "../../../../helpers/withController";

import { TripService } from "../trip.service";

export const completeTrip = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const savedTrip = await TripService.completeTrip(userId);

  return res.json({
    message: `Trip with id ${savedTrip?.get("_id")} completed successfully`
  });
};

export default [
  withController("/complete/:userId", "patch", asyncWrapper(completeTrip))
];
