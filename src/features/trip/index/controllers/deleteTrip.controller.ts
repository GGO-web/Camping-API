import { Request, Response } from "express";
import { IRouteConfig } from "../../../../types/routeConfig.type";

import { TripService } from "../trip.service";

export const deleteTrip = async (
  req: Request<any, any, { userId: string; tripId: string }, any>,
  res: Response
) => {
  const { userId, tripId } = req.query;

  await TripService.deleteTrip(userId, tripId);

  return res.json({ message: "Trip deleted successfully" });
};

export default {
  route: deleteTrip,
  method: "delete",
  path: "/delete",
} as IRouteConfig;
