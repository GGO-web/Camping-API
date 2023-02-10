import { ObjectId } from "mongoose";

import { IBagItem } from "../models/Bag.model";
import { ITrip, Trip } from "../models/Trip.model";
import { AppError } from "../models/Error.model";
import { IActivity } from "../models/Activity.model";

import { isValidImageFormat } from "../helpers/isValidImageFormat";
import { v4 } from "uuid";
import { ISnap, Snap } from "../models/Snap.model";
import { IUser, User } from "../models/User.model";
import { UserService } from "./UserService";

export class TripService {
  private static getTrip = async (tripId: string, userId: string) => {
    const trip = await Trip.findOne({
      _id: tripId,
      "teammates.userId": userId,
    });

    return trip;
  };

  private static getTripAsTeammate = async (tripId: string, userId: string) => {
    const trip = await Trip.findOne({
      _id: tripId,
      "teammates.userId": userId,
    });

    return trip;
  };

  public static getAllUserTrips = async (userId: string) => {
    const ownTrips = await Trip.find({ userId });
    const tripsAsTeammate = await Trip.find({ "teammates.userId": userId });

    return [...ownTrips, ...tripsAsTeammate];
  };

  private static getActivatedTripAsTeammate = async (userId: string) => {
    const activatedTripAsTeammate = await Trip.findOne({
      "teammates.userId": userId,
      "teammates.isOnline": true,
      activated: true,
    });

    return activatedTripAsTeammate;
  };

  private static getActivatedTripAsOwner = async (userId: string) => {
    const activatedTripAsOwner = await Trip.findOne({
      userId,
      activated: true,
    });

    return activatedTripAsOwner;
  };

  public static getActivatedTrip = async (userId: string) => {
    const activatedTrip = await this.getActivatedTripAsOwner(userId);

    if (!activatedTrip) {
      const activatedTripAsTeammate = await this.getActivatedTripAsTeammate(
        userId
      );

      if (!activatedTripAsTeammate) {
        throw new AppError("User has no activated trip", 404);
      }

      return activatedTripAsTeammate;
    }

    return activatedTrip;
  };

  public static getDontCompletedTrip = async (userId: string) => {
    const dontCompletedTrip = await Trip.findOne({ userId, completed: false });

    if (!dontCompletedTrip) {
      throw new AppError("User has no trips which is not completed yet", 404);
    }

    return dontCompletedTrip;
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

    // else if (tripsAsTeammate) {
    tripAsTeammate?.set({
      teammates: tripAsTeammate?.teammates.map((teammate) => {
        if (teammate.userId === userId) {
          return { ...teammate, isOnline: true };
        }
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
        { userId: userId },
        { "teammates.userId": userId, "teammates.isOnline": true },
      ],
      activated: true,
    });

    const currentTrip = await this.getTrip(trip?.get("_id"), userId);
    const tripAsTeammate = await this.getTripAsTeammate(
      trip?.get("_id"),
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

    return removedTrip;
  };

  private static getBagItem = async (
    userId: string,
    trip: ITrip,
    bagItemId: string
  ) => {
    const currentBagItem = trip?.bagItems.find(
      (bagItem) => bagItem.id === bagItemId
    );

    if (!currentBagItem) {
      throw new AppError(
        `Bag item with id ${bagItemId || "undefined"} is not found`,
        404
      );
    }

    if (currentBagItem.userId !== userId && trip.userId !== userId) {
      throw new AppError(
        "The user can only access their own belongings in the bag",
        400
      );
    }

    return currentBagItem;
  };

  public static addBagItem = async (tripId: string, bagItem: IBagItem) => {
    const tripAsOwner = await this.getTrip(tripId, bagItem.userId);
    const tripAsTeammate = await this.getTripAsTeammate(tripId, bagItem.userId);

    const trip = tripAsOwner || tripAsTeammate;

    if (!trip) {
      throw new AppError("User has no trips yet", 404);
    }

    // add bagItem to trip.bagItems array
    trip?.bagItems.push({ ...bagItem, id: v4() });

    const savedTrip = await trip?.save();

    return savedTrip;
  };

  public static updateBagImage = async (
    userId: string,
    bagItemId: string,
    image: string
  ) => {
    const trip = await this.getActivatedTrip(userId);

    // check if bag item with ID is present in trip
    await this.getBagItem(userId, trip, bagItemId);

    if (!isValidImageFormat(image)) {
      throw new AppError(
        "Image format is not allowed or incorrect. Use base64 instead",
        400
      );
    }

    // format is valid set bag image
    trip.set({
      bagItems: trip.bagItems.map((bagItem) =>
        bagItem.id === bagItemId
          ? {
              ...bagItem,
              image: image,
            }
          : bagItem
      ),
    });

    await trip.save();
  };

  public static updateBagItemCount = async (
    userId: string,
    bagItemId: string,
    count: number
  ) => {
    const trip = await this.getActivatedTrip(userId);

    // check if bag item with ID is present in trip
    await this.getBagItem(userId, trip, bagItemId);

    trip.set({
      bagItems: trip.bagItems.map((bagItem) =>
        bagItem.id === bagItemId
          ? {
              ...bagItem,
              count,
            }
          : bagItem
      ),
    });

    await trip.save();
  };

  public static deleteBagItem = async (userId: string, bagItemId: string) => {
    const trip = await this.getActivatedTrip(userId);

    // check if bag item with ID is present in trip
    await this.getBagItem(userId, trip, bagItemId);

    trip.set({
      bagItems: trip.bagItems.filter((bagItem) => bagItem.id !== bagItemId),
    });

    await trip.save();
  };

  private static getActivityItem = async (
    userId: string,
    trip: ITrip,
    activityId: string
  ) => {
    const currentActivity = trip?.activities.find(
      (activity) => activity.id === activityId
    );

    if (!currentActivity) {
      throw new AppError(
        `Activity item with id ${
          activityId || "undefined"
        } is not found in activated trip`,
        404
      );
    }

    if (currentActivity.userId !== userId && trip.userId !== userId) {
      throw new AppError("The user can only access their own activities", 400);
    }

    return currentActivity;
  };

  public static addActivity = async (userId: string, activity: IActivity) => {
    const activatedTrip = await this.getActivatedTrip(userId);

    activatedTrip?.activities.push({ ...activity, userId, id: v4() });

    await activatedTrip?.save();
  };

  public static setActivityCompleted = async (
    userId: string,
    activityId: string
  ) => {
    const trip = await this.getActivatedTrip(userId);

    // check if activity with ID is present in trip
    const activity = await this.getActivityItem(userId, trip, activityId);

    if (activity.completed) {
      throw new AppError("Activity has been already completed", 400);
    }

    trip.set({
      activities: trip.activities.map((activity) =>
        activity.id === activityId
          ? {
              ...activity,
              completed: true,
            }
          : activity
      ),
    });

    await trip.save();

    return activity;
  };

  public static deleteActivity = async (userId: string, activityId: string) => {
    const trip = await this.getActivatedTrip(userId);

    // check if activity with ID is present in trip
    const activity = await this.getActivityItem(userId, trip, activityId);

    trip.set({
      activities: trip.activities.filter(
        (activity) => activity.id !== activityId
      ),
    });

    await trip.save();

    return activity;
  };

  public static getAllUserSnaps = async (userId: string) => {
    const snaps = await Snap.find({ userId });

    return snaps;
  };

  public static createTripSnap = async (snap: ISnap) => {
    const createdSnap = await Snap.create(snap);

    return createdSnap;
  };

  public static getAllUserTeammates = async (userId: string) => {
    const activatedTrip = await this.getActivatedTrip(userId);

    const teammates: IUser[] = [];

    for (let currentTeammate of activatedTrip?.teammates) {
      if (!currentTeammate) {
        continue;
      }

      const teammate = await UserService.getUser(currentTeammate.userId);

      teammates.push(teammate as IUser);
    }

    return teammates;
  };

  private static isTeammatePresentInTrip = async (userId: string) => {
    const activatedTrip = await this.getActivatedTrip(userId);

    const teammate = activatedTrip?.teammates.find(
      (teammate) => teammate.userId === userId
    );

    return teammate;
  };

  public static addTeammate = async (userId: string, teammateId: string) => {
    const activatedTrip = await this.getActivatedTrip(userId);
    const teammate = await User.findOne({ uid: teammateId });

    if (RegExp(userId, "i").test(teammateId)) {
      throw new AppError("You can't add yourself as a teammate", 400);
    }

    const isPresentAlready = await this.isTeammatePresentInTrip(userId);

    if (isPresentAlready) {
      throw new AppError("Teammate is already added", 400);
    }

    if (!teammate) {
      throw new AppError("Teammate is not found", 404);
    }

    activatedTrip?.teammates.push({
      userId: teammateId,
      isOnline: false,
    });

    await activatedTrip?.save();
  };

  public static deleteTeammate = async (userId: string, teammateId: string) => {
    const activatedTrip = await this.getActivatedTrip(userId);

    const teammateIsPresent = await this.isTeammatePresentInTrip(userId);

    if (!teammateIsPresent) {
      throw new AppError(
        "Teammate is not found or has been already removed",
        404
      );
    }

    activatedTrip?.set({
      teammates: activatedTrip.teammates.filter(
        (teammate) => teammate.userId !== teammateId
      ),
    });

    await activatedTrip?.save();
  };
}
