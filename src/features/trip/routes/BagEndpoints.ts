import { Request, Response } from "express";

import { BagService } from "../../../services/BagService";
import { TripService } from "../../../services/TripService";

import { IBagItem } from "../../../models/Bag.model";

// Bag endpoints
export const getBagItems = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const trip = await TripService.getActivatedTrip(userId);

  return res.json(trip.bagItems);
};

export const addBagItem = async (req: Request, res: Response) => {
  const { tripId } = req.params;
  const bagItem = req.body as IBagItem;

  await BagService.addBagItem(tripId, bagItem);

  return res.json({ message: "Bag item added successfully" });
};

export const updateBagImage = async (req: Request, res: Response) => {
  const { userId, bagItemId, image } = req.body;

  await BagService.updateBagImage(userId, bagItemId, image);

  return res.json({ message: "Bag item image updated successfully" });
};

export const updateBagItemCount = async (req: Request, res: Response) => {
  const { userId, bagItemId, count } = req.body;

  await BagService.updateBagItemCount(userId, bagItemId, count);

  return res.json({ message: "Bag item count has been updated successfully" });
};

export const deleteBagItem = async (
  req: Request<any, any, { userId: string; bagItemId: string }, any>,
  res: Response
) => {
  const { userId, bagItemId } = req.query;

  await BagService.deleteBagItem(userId as string, bagItemId as string);

  return res.json({ message: "Bag item has been deleted successfully" });
};
