import { Request, Response } from "express";

import { TripService } from "../trip.service";

export const activateTrip = async (req: Request, res: Response) => {
  const { userId, tripId } = req.body;

  await TripService.activateTrip(userId, tripId);

  return res.json({ message: "Trip activated successfully" });
};

export default {
  route: activateTrip,
  method: "patch",
  path: "/activate",
};
