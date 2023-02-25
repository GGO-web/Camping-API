import { AppError } from "../../models/Error.model";

import { NotificationService } from "../notification/notification.service";

import { Trip, ITrip } from "./trip.model";

export class TripService {
  public static getTrip = async (tripId: string, userId: string) => {
    const trip = await Trip.findOne({
      _id: tripId,
      userId,
    });

    return trip;
  };

  public static getTripAsTeammate = async (tripId: string, userId: string) => {
    const trip = await Trip.findOne({
      _id: tripId,
      "teammates.userId": userId,
    });

    return trip;
  };

  public static getAllUserTrips = async (userId: string) => {
    const ownTrips = await Trip.find({ userId });
    const tripsAsTeammate = await Trip.find({
      "teammates.userId": userId,
      activated: true,
    });

    return [...ownTrips, ...tripsAsTeammate];
  };

  public static getActivatedTripAsTeammate = async (userId: string) => {
    const activatedTripAsTeammate = await Trip.findOne({
      "teammates.userId": userId,
      "teammates.isOnline": true,
      activated: true,
    });

    return activatedTripAsTeammate;
  };

  public static getActivatedTripAsOwner = async (userId: string) => {
    const activatedTripAsOwner = await Trip.findOne({
      userId,
      activated: true,
    });

    return activatedTripAsOwner;
  };

  public static getActivatedTrip = async (userId: string) => {
    const activatedTrip = await this.getActivatedTripAsOwner(userId);

    if (activatedTrip) {
      return activatedTrip;
    }

    const activatedTripAsTeammate = await this.getActivatedTripAsTeammate(
      userId
    );

    if (!activatedTripAsTeammate) {
      throw new AppError("User has no activated trip", 404);
    }

    return activatedTripAsTeammate;
  };

  public static getDontCompletedTrip = async (userId: string) => {
    const dontCompletedTrip = await Trip.findOne({ userId, completed: false });

    if (!dontCompletedTrip) {
      throw new AppError("User has no trips which is not completed yet", 404);
    }

    return dontCompletedTrip;
  };

  public static createTrip = async (trip: ITrip) => {
    const { userId, tripName } = trip;

    const newTrip = new Trip(trip);

    await newTrip.save();

    await NotificationService.createNotification({
      userId,
      title: "Trip created",
      message: `Trip (${tripName}) has been created successfully`,
      type: "success",
    });

    return newTrip;
  };

  public static activateTrip = async (userId: string, tripId: string) => {
    const trips = await Trip.find({ userId });

    const currentTrip = await this.getTrip(tripId, userId);
    const tripAsTeammate = await this.getTripAsTeammate(tripId, userId);

    if (!currentTrip && !tripAsTeammate) {
      throw new AppError("Trip is not found", 404);
    }

    trips.forEach((trip) => {
      trip.set({ activated: false });
      trip.save();
    });

    if (currentTrip) {
      currentTrip?.set({ activated: true });

      await currentTrip?.save();

      return currentTrip;
    }

    if (!tripAsTeammate?.activated) {
      throw new AppError(
        "Trip is disabled by owner and you can't enter it",
        400
      );
    }

    // else if (tripsAsTeammate) {
    tripAsTeammate?.set({
      teammates: tripAsTeammate?.teammates.map((teammate) => {
        if (teammate.userId === userId) {
          return { ...teammate, isOnline: true };
        }

        return teammate;
      }),
    });

    await tripAsTeammate?.save();

    return tripAsTeammate;
  };

  public static completeTrip = async (userId: string) => {
    const trip = await TripService.getDontCompletedTrip(userId);
    trip?.set({ completed: true });

    const savedTrip = await trip?.save();

    await TripService.activateTrip(userId, savedTrip?.get("_id"));

    return savedTrip;
  };

  public static deactivateTrip = async (userId: string) => {
    const trip = await Trip.findOne({
      $or: [
        { userId },
        { "teammates.userId": userId, "teammates.isOnline": true },
      ],
      activated: true,
    });

    const currentTrip = await this.getTrip(trip?.get("_id").toString(), userId);
    const tripAsTeammate = await this.getTripAsTeammate(
      trip?.get("_id").toString(),
      userId
    );

    if (!currentTrip && !tripAsTeammate) {
      throw new AppError("User has no activated trip yet", 404);
    }

    if (currentTrip) {
      currentTrip?.set({ activated: false });

      await currentTrip?.save();

      return currentTrip;
    }

    // else if (tripsAsTeammate) {
    tripAsTeammate?.set({
      teammates: tripAsTeammate?.teammates.map((teammate) => {
        if (teammate.userId === userId) {
          return { ...teammate, isOnline: false };
        }

        return teammate;
      }),
    });

    await tripAsTeammate?.save();

    return tripAsTeammate;
  };

  public static deleteTrip = async (userId: string, tripId: string) => {
    const removedTrip = await Trip.findOneAndDelete({ userId, _id: tripId });

    if (!removedTrip) {
      throw new AppError("Trip is not found or already removed", 404);
    }

    await NotificationService.createNotification({
      userId,
      title: "Trip deleted",
      message: `Trip (${removedTrip?.tripName} is unavailable and all data is removed, except your snaps`,
      type: "success",
    });

    return removedTrip;
  };
}
