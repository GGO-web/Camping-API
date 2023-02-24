import { Request, Response } from "express";

import { TripService } from "../../../services/TripService";

import { ITrip } from "../../../models/Trip.model";

// Trip endpoints
export const getAllUserTrips = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const trips = await TripService.getAllUserTrips(userId);

  return res.json(trips);
};

export const createTrip = async (req: Request, res: Response) => {
  const trip = req.body as ITrip;

  const savedTrip = await TripService.createTrip(trip);

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

  await TripService.deleteTrip(userId, tripId);

  return res.json({ message: "Trip deleted successfully" });
};
