import { Request, Response } from "express";
import { asyncWrapper } from "../../../../helpers/asyncWrapper";
import { withController } from "../../../../helpers/withController";

import { ISnap } from "../snap.model";
import { SnapsService } from "../snaps.service";

export const createTripSnap = async (
  req: Request<any, { snap: ISnap }, any, any>,
  res: Response
) => {
  const snap = req.body;

  const createdSnap = await SnapsService.createTripSnap(snap);

  return res.json({
    message: `Snap with id ${createdSnap.get(
      "_id"
    )} has been created successfully`
  });
};

export default [
  withController("/create", "post", asyncWrapper(createTripSnap))
];
