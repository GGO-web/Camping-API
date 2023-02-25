import { Request, Response } from "express";

import { TripService } from "../trip.service";

export const getAllUserTrips = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const trips = await TripService.getAllUserTrips(userId);

  return res.json(trips);
};

export default {
  route: getAllUserTrips,
  method: "get",
  path: "/all/:userId",
};
