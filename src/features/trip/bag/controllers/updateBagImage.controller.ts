import { Request, Response } from "express";
import { asyncWrapper } from "../../../../helpers/asyncWrapper";
import { withController } from "../../../../helpers/withController";

import { BagService } from "../bag.service";

export const updateBagImage = async (req: Request, res: Response) => {
  const { userId, bagItemId, image } = req.body;

  await BagService.updateBagImage(userId, bagItemId, image);

  return res.json({ message: "Bag item image updated successfully" });
};

export default [
  withController("/image", "patch", asyncWrapper(updateBagImage))
];
