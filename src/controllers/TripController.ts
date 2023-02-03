import { Request, Response } from "express";
import { ObjectId } from "mongoose";

import { TripService } from "../services/TripService";

import { IBagItem } from "../models/Bag.model";
import { ITrip, Trip } from "../models/Trip.model";
import { IActivity } from "../models/Activity.model";
import { ISnap } from "../models/Snap.model";
import { NotificationService } from "../services/NotificationService";

// Trip endpoints
export const getAllUserTrips = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const trips = await Trip.find({ userId });

  return res.json(trips);
};

export const createTrip = async (req: Request, res: Response) => {
  const { tripName, tripPeriod, userId, ...otherTripParams } =
    req.body as ITrip;

  const trip = new Trip({ userId, tripName, tripPeriod, ...otherTripParams });

  const savedTrip = await trip.save();

  await NotificationService.createNotification({
    userId,
    title: "Trip created",
    message: `Trip ${tripName} has been created successfully`,
    type: "info",
  });

  return res.json(savedTrip);
};

export const activateTrip = async (req: Request, res: Response) => {
  const { userId, tripId } = req.body;

  const trip = await TripService.activateTrip(userId, tripId);

  await NotificationService.createNotification({
    userId,
    title: "Trip activated",
    message: `Trip ${trip?.tripName} now is activated your can add your activities, snaps, bag items and join your friends`,
    type: "success",
  });

  return res.json({ message: "Trip activated successfully" });
};

export const deactivateTrip = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const trip = await TripService.deactivateTrip(userId);

  await NotificationService.createNotification({
    userId,
    title: "Trip deactivated",
    message: `You are deactived your trip ${trip?.tripName}, you can activate it manually in the Homepage or create another one`,
    type: "info",
  });

  return res.json({ message: "Trip deactivated successfully" });
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

export const deleteTrip = async (
  req: Request<any, any, { userId: string; tripId: string }, any>,
  res: Response
) => {
  const { userId, tripId } = req.query;

  const trip = await TripService.deleteTrip(userId, tripId);

  await NotificationService.createNotification({
    userId,
    title: "Trip deleted",
    message: `Trip ${trip?.tripName} now is unavailable and all data is removed except your snaps`,
    type: "success",
  });

  return res.json({ message: "Trip deleted successfully" });
};

// Bag endpoints
export const getBagItems = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const trip = await TripService.getActivatedTrip(userId);

  return res.json(trip.bagItems);
};

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

export const deleteBagItem = async (
  req: Request<any, any, { userId: string; bagItemId: string }, any>,
  res: Response
) => {
  const { userId, bagItemId } = req.query;

  await TripService.deleteBagItem(userId as string, bagItemId as string);

  return res.json({ message: "Bag item has been deleted successfully" });
};

// Activity endpoints
export const getActivities = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const trip = await TripService.getActivatedTrip(userId);

  return res.json(trip.activities);
};

export const addActivity = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const activity = req.body as IActivity;

  await TripService.addActivity(userId, activity);

  await NotificationService.createNotification({
    userId,
    title: "You have new activity",
    message: `You are created a new trip activity named: ${activity.heading}`,
    type: "info",
  });

  return res.json({ message: "Activity added successfully" });
};

export const setActivityCompleted = async (req: Request, res: Response) => {
  const { userId, activityId } = req.body;

  const activity = await TripService.setActivityCompleted(userId, activityId);

  await NotificationService.createNotification({
    userId,
    title: "You has completed activity",
    message: `Named ${activity.heading}`,
    type: "success",
  });

  return res.json({
    message: `Activity with id ${activityId} has been completed successfully`,
  });
};

export const deleteActivity = async (
  req: Request<any, any, { userId: string; activityId: string }, any>,
  res: Response
) => {
  const { userId, activityId } = req.query;

  const activity = await TripService.deleteActivity(userId, activityId);

  await NotificationService.createNotification({
    userId,
    title: "Deleted activity",
    message: `You deleted an activity named: ${activity.heading}`,
    type: "success",
  });

  return res.json({
    message: `Activity with id ${activityId} has been deleted successfully`,
  });
};

// Snaps endpoints
export const getAllUserTripSnaps = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const snaps = await TripService.getAllUserSnaps(userId);

  return res.json(snaps);
};

export const createTripSnap = async (
  req: Request<any, { snap: ISnap }, any, any>,
  res: Response
) => {
  const snap = req.body;

  const createdSnap = await TripService.createTripSnap(snap);

  return res.json({
    message: `Snap with id ${createdSnap._id} has been created successfully`,
  });
};
