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
  private static getTrip = async (tripId: string) => {
    const trip = await Trip.findById(tripId);

    if (!trip) {
      throw new AppError("Trip is not found", 404);
    }

    return trip;
  };

  public static getAllUserTrips = async (userId: string) => {
    const ownTrips = await Trip.find({ userId });
    const tripsAsTeammate = await Trip.find({ teammates: userId });

    const activatedTripAsOwner = await this.getActivatedTripAsOwner(userId);
    const activatedTripAsTeammate = await this.getActivatedTripAsTeammate(
      userId
    );

    console.log(activatedTripAsOwner, activatedTripAsTeammate);

    if (activatedTripAsOwner && activatedTripAsTeammate) {
      return ownTrips;
    }

    return [...ownTrips, ...tripsAsTeammate];
  };

  private static getActivatedTripAsTeammate = async (userId: string) => {
    const activatedTripAsTeammate = await Trip.findOne({
      teammates: userId,
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

  public static activateTrip = async (userId: string, tripId: ObjectId) => {
    const trips = await Trip.find({ userId });

    trips.forEach((trip) => {
      trip.set({ activated: false });
      trip.save();
    });

    const currentTrip = await Trip.findById({ _id: tripId });
    currentTrip?.set({ activated: true });

    await currentTrip?.save();

    return currentTrip;
  };

  public static completeTrip = async (userId: string) => {
    const trip = await TripService.getDontCompletedTrip(userId);
    trip?.set({ completed: true });

    const savedTrip = await trip?.save();

    await TripService.activateTrip(userId, savedTrip?.get("_id") as ObjectId);

    return savedTrip;
  };

  public static deactivateTrip = async (userId: string) => {
    const trip = await Trip.findOne({ userId, activated: true });

    if (!trip) {
      throw new AppError("User has no trips yet", 404);
    }

    trip.set({ activated: false });

    await trip.save();

    return trip;
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
    const trip = await this.getTrip(tripId);

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

    for (let teammateId of activatedTrip?.teammates) {
      const teammate = await UserService.getUser(teammateId);

      teammates.push(teammate as IUser);
    }

    return teammates;
  };

  public static addTeammate = async (userId: string, teammateId: string) => {
    const activatedTrip = await this.getActivatedTrip(userId);
    const teammate = await User.findOne({ uid: teammateId });

    const userTeammates = activatedTrip?.teammates;

    if (RegExp(userId, "i").test(teammateId)) {
      throw new AppError("You can't add yourself as a teammate", 400);
    }

    if (userTeammates?.includes(teammateId)) {
      throw new AppError("Teammate is already added", 400);
    }

    if (!teammate) {
      throw new AppError("Teammate is not found", 404);
    }

    activatedTrip?.teammates.push(teammateId);

    await activatedTrip?.save();
  };

  public static deleteTeammate = async (userId: string, teammateId: string) => {
    const activatedTrip = await this.getActivatedTrip(userId);

    const userTeammates = activatedTrip?.teammates;

    if (!userTeammates?.includes(teammateId)) {
      throw new AppError(
        "Teammate is not found or has been already removed",
        404
      );
    }

    activatedTrip?.set({
      teammates: activatedTrip.teammates.filter(
        (currentTeammateId) => currentTeammateId !== teammateId
      ),
    });

    await activatedTrip?.save();
  };
}
