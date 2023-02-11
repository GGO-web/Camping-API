import { Request, Response } from "express";

import { TripService } from "../services/TripService";
import { NotificationService } from "../services/NotificationService";
import { UserService } from "../services/UserService";

import { IBagItem } from "../models/Bag.model";
import { ITrip, Trip } from "../models/Trip.model";
import { IActivity } from "../models/Activity.model";
import { ISnap } from "../models/Snap.model";

// Trip endpoints
export const getAllUserTrips = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const trips = await TripService.getAllUserTrips(userId);

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
    message: `Trip (${tripName}) has been created successfully`,
    type: "success",
  });

  return res.json(savedTrip);
};

export const activateTrip = async (req: Request, res: Response) => {
  const { userId, tripId } = req.body;

  await TripService.activateTrip(userId, tripId);

  return res.json({ message: "Trip activated successfully" });
};

export const deactivateTrip = async (req: Request, res: Response) => {
  const { userId } = req.params;

  await TripService.deactivateTrip(userId);

  return res.json({ message: "Trip deactivated successfully" });
};

export const getActivatedTrip = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const trip = await TripService.getActivatedTrip(userId);

  return res.json(trip);
};

export const completeTrip = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const savedTrip = await TripService.completeTrip(userId);

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
    message: `Trip (${trip?.tripName} is unavailable and all data is removed, except your snaps`,
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
    title: "New activity",
    message: `Activity (${activity.heading}) has been added successfully`,
    type: "success",
  });

  return res.json({ message: "Activity added successfully" });
};

export const setActivityCompleted = async (req: Request, res: Response) => {
  const { userId, activityId } = req.body;

  const activity = await TripService.setActivityCompleted(userId, activityId);

  await NotificationService.createNotification({
    userId,
    title: "Completed activity",
    message: `Activity (${activity.heading}) completed successfully`,
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
    message: `Activity (${activity.heading}) has been deleted successfully`,
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

// Teammates endpoints
export const getAllUserTeammates = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const teammates = await TripService.getAllUserTeammates(userId);

  return res.json(teammates);
};

export const addTeammate = async (req: Request, res: Response) => {
  const { userId, teammateId } = req.body;

  const user = await UserService.getUser(userId);
  const teammate = await UserService.getUser(teammateId);

  const activatedTrip = await TripService.getActivatedTrip(userId);

  await TripService.addTeammate(userId, teammateId);

  await NotificationService.createNotification({
    userId: userId,
    title: "Teammate added to trip",
    message: `You added user (${userId?.fullname}) successfully`,
    type: "success",
  });

  await NotificationService.createNotification({
    userId: teammateId,
    title: `Invitation from ${user?.fullname}`,
    message: `You are invited to the trip (${activatedTrip.tripName})`,
    type: "success",
  });

  return res.json({ message: "Teammate added successfully" });
};

export const deleteTeammate = async (
  req: Request<any, any, { userId: string; teammateId: string }, any>,
  res: Response
) => {
  const { userId, teammateId } = req.query;

  await TripService.deleteTeammate(userId, teammateId);

  const teammate = await UserService.getUser(teammateId);

  await NotificationService.createNotification({
    userId: teammateId,
    title: "Teammate deleted from trip",
    message: `User (${teammate!.fullname}) has been deleted from your trip`,
    type: "success",
  });

  return res.json({ message: "Teammate deleted successfully" });
};
