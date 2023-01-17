import { Request, Response } from "express";
import { ObjectId } from "mongoose";

import crypto from "crypto";

import { TripService } from "../services/TripService";

import { IBagItem } from "../models/Bag.model";
import { ITrip, Trip } from "../models/Trip.model";

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

export const getActivatedTrip = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const trip = await TripService.getActivatedTrip(userId);

  return res.json(trip);
};

export const addBagItem = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const bagItem = req.body as IBagItem;

  const trip = await TripService.addBagItem(userId, bagItem);

  console.log(trip);

  return res.json({ message: "Bag item added successfully" });
};

export const completeTrip = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const trip = await TripService.getDontCompletedTrip(userId);

  trip?.set({ completed: true });

  const savedTrip = await trip?.save();

  TripService.activateTrip(userId, savedTrip?.get("_id") as ObjectId);

  return res.json(savedTrip);
};

export const deleteTrip = async (req: Request, res: Response) => {
  const { tripId } = req.params;

  await Trip.findByIdAndDelete(tripId);

  return res.json({ message: "Trip deleted successfully" });
};
