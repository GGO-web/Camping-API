import { Request, Response } from "express";

import { TripService } from "../trip.service";

export const getActivatedTrip = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const trip = await TripService.getActivatedTrip(userId);

  return res.json(trip);
};

export default {
  route: getActivatedTrip,
  method: "get",
  path: "/activated/:userId",
};
