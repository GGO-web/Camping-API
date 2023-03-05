import { Request, Response } from "express";
import { IRouteConfig } from "../../../../types/routeConfig.type";

import { TripService } from "../../index/trip.service";

export const getBagItems = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const trip = await TripService.getActivatedTrip(userId);

  return res.json(trip.bagItems);
};

export default {
  route: getBagItems,
  method: "get",
  path: "/all/:userId",
} as IRouteConfig;
