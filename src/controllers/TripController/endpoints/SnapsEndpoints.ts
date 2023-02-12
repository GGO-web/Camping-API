import { Request, Response } from "express";

import { SnapsService } from "../../../services/SnapsService";

import { ISnap } from "../../../models/Snap.model";

// Snaps endpoints
export const getAllUserTripSnaps = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const snaps = await SnapsService.getAllUserSnaps(userId);

  return res.json(snaps);
};

export const createTripSnap = async (
  req: Request<any, { snap: ISnap }, any, any>,
  res: Response
) => {
  const snap = req.body;

  const createdSnap = await SnapsService.createTripSnap(snap);

  return res.json({
    message: `Snap with id ${createdSnap._id} has been created successfully`,
  });
};
