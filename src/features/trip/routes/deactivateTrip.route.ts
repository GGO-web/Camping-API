import { Request, Response } from "express";
import { IRouteConfig } from "../../../types/routeConfig.type";

import { TripService } from "../trip.service";

export const deactivateTrip = async (req: Request, res: Response) => {
  const { userId } = req.params;

  await TripService.deactivateTrip(userId);

  return res.json({ message: "Trip deactivated successfully" });
};

export default {
  route: deactivateTrip,
  method: "patch",
  path: "/deactivate/:userId",
} as IRouteConfig;
