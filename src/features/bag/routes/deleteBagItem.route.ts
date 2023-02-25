import { Request, Response } from "express";

import { BagService } from "../bag.service";

export const deleteBagItem = async (
  req: Request<any, any, { userId: string; bagItemId: string }, any>,
  res: Response
) => {
  const { userId, bagItemId } = req.query;

  await BagService.deleteBagItem(userId as string, bagItemId as string);

  return res.json({ message: "Bag item has been deleted successfully" });
};

export default {
  route: deleteBagItem,
  method: "delete",
  path: "/delete",
};
