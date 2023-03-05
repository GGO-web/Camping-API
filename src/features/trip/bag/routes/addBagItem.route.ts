import { Request, Response } from "express";
import { IRouteConfig } from "../../../../types/routeConfig.type";

import type { IBagItem } from "../bag.model";

import { BagService } from "../bag.service";

export const addBagItem = async (
  req: Request<{ tripId: string }, unknown, IBagItem>,
  res: Response
) => {
  const { tripId } = req.params;
  const bagItem = req.body;

  await BagService.addBagItem(tripId, bagItem);

  return res.json({ message: "Bag item added successfully" });
};

export default {
  route: addBagItem,
  method: "post",
  path: "/:tripId",
} as IRouteConfig;
