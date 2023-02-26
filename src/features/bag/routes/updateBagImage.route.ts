import { Request, Response } from "express";
import { IRouteConfig } from "../../../types/routeConfig.type";

import { BagService } from "../bag.service";

export const updateBagImage = async (req: Request, res: Response) => {
  const { userId, bagItemId, image } = req.body;

  await BagService.updateBagImage(userId, bagItemId, image);

  return res.json({ message: "Bag item image updated successfully" });
};

export default {
  route: updateBagImage,
  method: "patch",
  path: "/image",
} as IRouteConfig;
