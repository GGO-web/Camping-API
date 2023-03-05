import { Request, Response } from "express";
import { asyncWrapper } from "../../../../helpers/asyncWrapper";
import { withController } from "../../../../helpers/withController";

import { TripService } from "../trip.service";

export const deleteTrip = async (
  req: Request<any, any, { userId: string; tripId: string }, any>,
  res: Response
) => {
  const { userId, tripId } = req.query;

  await TripService.deleteTrip(userId, tripId);

  return res.json({ message: "Trip deleted successfully" });
};

export default [withController("/delete", "delete", asyncWrapper(deleteTrip))];
