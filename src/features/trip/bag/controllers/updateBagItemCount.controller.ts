import { Request, Response } from "express";
import { asyncWrapper } from "../../../../helpers/asyncWrapper";
import { withController } from "../../../../helpers/withController";

import { BagService } from "../bag.service";

export const updateBagItemCount = async (req: Request, res: Response) => {
  const { userId, bagItemId, count } = req.body;

  await BagService.updateBagItemCount(userId, bagItemId, count);

  return res.json({ message: "Bag item count has been updated successfully" });
};

export default [
  withController("/count", "patch", asyncWrapper(updateBagItemCount))
];
