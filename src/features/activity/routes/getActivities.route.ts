import { Request, Response } from "express";

import { TripService } from "../../trip/trip.service";

const getActivities = async (
  req: Request<{ userId: string }>,
  res: Response
) => {
  const { userId } = req.params;

  const trip = await TripService.getActivatedTrip(userId);

  return res.json(trip.activities);
};

export default {
  route: getActivities,
  method: "get",
  path: "/all/:userId",
};
