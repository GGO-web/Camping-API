import { Request, Response } from "express";
import { asyncWrapper } from "../../../../helpers/asyncWrapper";
import { withController } from "../../../../helpers/withController";

import { SnapsService } from "../snaps.service";

// Snaps endpoints
export const getAllUserTripSnaps = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const snaps = await SnapsService.getAllUserSnaps(userId);

  return res.json(snaps);
};

export default [
  withController("/:userId", "get", asyncWrapper(getAllUserTripSnaps))
];
