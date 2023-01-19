import { Request, Response } from "express";
import { ObjectId } from "mongoose";

import { TripService } from "../services/TripService";

import { IBagItem } from "../models/Bag.model";
import { ITrip, Trip } from "../models/Trip.model";
import { IActivity } from "../models/Activity.model";

// Trip endpoints
export const getAllTrips = async (req: Request, res: Response) => {
  const trips = await Trip.find();

  return res.json(trips);
};

export const createTrip = async (req: Request, res: Response) => {
  const { tripName, tripPeriod, userId } = req.body as ITrip;

  const trip = new Trip({ userId, tripName, tripPeriod });

  const savedTrip = await trip.save();

  return res.json(savedTrip);
};

export const activateTrip = async (req: Request, res: Response) => {
  const { userId, tripId } = req.body;

  await TripService.activateTrip(userId, tripId);

  return res.json({ message: "Trip activated successfully" });
};

export const getActivatedTrip = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const trip = await TripService.getActivatedTrip(userId);

  return res.json(trip);
};

export const completeTrip = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const trip = await TripService.getDontCompletedTrip(userId);
  trip?.set({ completed: true });

  const savedTrip = await trip?.save();

  TripService.activateTrip(userId, savedTrip?.get("_id") as ObjectId);

  return res.json({
    message: `Trip with id ${savedTrip?.get("_id")} completed successfully`,
  });
};

export const deleteTrip = async (req: Request, res: Response) => {
  const { tripId } = req.params;

  await TripService.deleteTrip(tripId);

  return res.json({ message: "Trip deleted successfully" });
};

// Bag endpoints
export const addBagItem = async (req: Request, res: Response) => {
  const { tripId } = req.params;
  const bagItem = req.body as IBagItem;

  await TripService.addBagItem(tripId, bagItem);

  return res.json({ message: "Bag item added successfully" });
};

export const updateBagImage = async (req: Request, res: Response) => {
  const { userId, bagItemId, image } = req.body;

  await TripService.updateBagImage(userId, bagItemId, image);

  return res.json({ message: "Bag item image updated successfully" });
};

export const updateBagItemCount = async (req: Request, res: Response) => {
  const { userId, bagItemId, count } = req.body;

  await TripService.updateBagItemCount(userId, bagItemId, count);

  return res.json({ message: "Bag item count has been updated successfully" });
};

export const deleteBagItem = async (req: Request, res: Response) => {
  const { userId, bagItemId } = req.query as {
    userId: string;
    bagItemId: string;
  };

  await TripService.deleteBagItem(userId as string, bagItemId as string);

  return res.json({ message: "Bag item has been deleted successfully" });
};

// Activity endpoints
export const addActivity = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const activity = req.body as IActivity;

  await TripService.addActivity(userId, activity);

  return res.json({ message: "Activity added successfully" });
};

export const setActivityCompleted = async (req: Request, res: Response) => {
  const { userId, activityId } = req.body;

  await TripService.setActivityCompleted(userId, activityId);

  return res.json({
    message: `Activity with id ${activityId} has been completed successfully`,
  });
};

export const deleteActivity = async (req: Request, res: Response) => {
  const { userId, activityId } = req.query as {
    userId: string;
    activityId: string;
  };

  await TripService.deleteActivity(userId, activityId);

  return res.json({
    message: `Activity with id ${activityId} has been deleted successfully`,
  });
};
