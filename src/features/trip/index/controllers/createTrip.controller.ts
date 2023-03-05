import { Request, Response } from "express";
import { asyncWrapper } from "../../../../helpers/asyncWrapper";
import { withController } from "../../../../helpers/withController";

import { ITrip } from "../trip.model";

import { TripService } from "../trip.service";

export const createTrip = async (req: Request, res: Response) => {
  const trip = req.body as ITrip;

  const savedTrip = await TripService.createTrip(trip);

  return res.json(savedTrip);
};

export default [withController("/create", "post", asyncWrapper(createTrip))];
