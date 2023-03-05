import { Request, Response } from "express";
import { asyncWrapper } from "../../../../helpers/asyncWrapper";
import { withController } from "../../../../helpers/withController";

import { TripService } from "../../index/trip.service";

export const getBagItems = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const trip = await TripService.getActivatedTrip(userId);

  return res.json(trip.bagItems);
};

export default [
  withController("/all/:userId", "get", asyncWrapper(getBagItems))
];
