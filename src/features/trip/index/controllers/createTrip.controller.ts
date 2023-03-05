import { Request, Response } from "express";
import { IRouteConfig } from "../../../../types/routeConfig.type";

import { ITrip } from "../trip.model";

import { TripService } from "../trip.service";

export const createTrip = async (req: Request, res: Response) => {
  const trip = req.body as ITrip;

  const savedTrip = await TripService.createTrip(trip);

  return res.json(savedTrip);
};

export default {
  route: createTrip,
  method: "post",
  path: "/create",
} as IRouteConfig;
