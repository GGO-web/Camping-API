import { Request, Response } from "express";
import { IRouteConfig } from "../../../types/routeConfig.type";

import { BagService } from "../bag.service";

export const updateBagItemCount = async (req: Request, res: Response) => {
  const { userId, bagItemId, count } = req.body;

  await BagService.updateBagItemCount(userId, bagItemId, count);

  return res.json({ message: "Bag item count has been updated successfully" });
};

export default {
  route: updateBagItemCount,
  method: "patch",
  path: "/count",
} as IRouteConfig;
