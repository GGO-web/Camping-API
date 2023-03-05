import { Request, Response } from "express";
import { IRouteConfig } from "../../../../types/routeConfig.type";

import { SnapsService } from "../snaps.service";

// Snaps endpoints
export const getAllUserTripSnaps = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const snaps = await SnapsService.getAllUserSnaps(userId);

  return res.json(snaps);
};

export default {
  route: getAllUserTripSnaps,
  method: "get",
  path: "/:userId",
} as IRouteConfig;
