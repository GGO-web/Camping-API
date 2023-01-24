import { ObjectId } from "mongoose";

import { IBagItem } from "../models/Bag.model";
import { ITrip, Trip } from "../models/Trip.model";
import { AppError } from "../models/Error.model";
import { IActivity } from "../models/Activity.model";

import { isValidImageFormat } from "../helpers/isValidImageFormat";
import { v4 } from "uuid";
import { ISnap, Snap } from "../models/Snap.model";

export class TripService {
  private static getTrip = async (tripId: string) => {
    const trip = await Trip.findById(tripId);

    if (!trip) {
      throw new AppError("Trip is not found", 404);
    }

    return trip;
  };

  public static getActivatedTrip = async (userId: string) => {
    const activatedTrip = await Trip.findOne({ userId, activated: true });

    if (!activatedTrip) {
      throw new AppError("User has no activated trip", 404);
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

  public static addBagItem = async (tripId: string, bagItem: IBagItem) => {
    // find trip by id because we can add item to trip which is not activated and not completed
    const trip = await this.getTrip(tripId);

    if (!trip) {
      throw new AppError("User has no trips yet", 404);
    }

    // add bagItem to trip.bagItems array
    trip?.bagItems.push({...bagItem, id: v4()});

    const savedTrip = await trip?.save();

    return savedTrip;
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

  public static deactivateTrip = async (userId: string) => {
    const trip = await this.getActivatedTrip(userId);

    trip?.set({ activated: false });

    await trip?.save();

    return trip;
  };

  public static deleteTrip = async (userId: string, tripId: string) => {
    const removedTrip = await Trip.findOneAndDelete({userId, _id: tripId});

    if (!removedTrip) {
      throw new AppError("Trip is not found or already removed", 404);
    }

    return removedTrip;
  };

  private static getBagItem = async (trip: ITrip, bagItemId: string) => {
    const currentBagItem = trip?.bagItems.find(
      (bagItem) => bagItem.id === bagItemId
    );

    console.log(currentBagItem);

    if (!currentBagItem) {
      throw new AppError(
        `Bag item with id ${bagItemId || "undefined"} is not found`,
        404
      );
    }

    return currentBagItem;
  };

  public static updateBagImage = async (
    userId: string,
    bagItemId: string,
    image: string
  ) => {
    const trip = await this.getActivatedTrip(userId);

    // check if bag item with ID is present in trip
    await this.getBagItem(trip, bagItemId);

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
    await this.getBagItem(trip, bagItemId);

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
    await this.getBagItem(trip, bagItemId);

    trip.set({
      bagItems: trip.bagItems.filter((bagItem) => bagItem.id !== bagItemId),
    });

    await trip.save();
  };

  private static getActivityItem = async (trip: ITrip, activityId: string) => {
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

    return currentActivity;
  };

  public static addActivity = async (userId: string, activity: IActivity) => {
    const activatedTrip = await this.getActivatedTrip(userId);

    activatedTrip?.activities.push({...activity, id: v4()});

    await activatedTrip?.save();
  };

  public static setActivityCompleted = async (
    userId: string,
    activityId: string
  ) => {
    const trip = await this.getActivatedTrip(userId);

    // check if activity with ID is present in trip
    const activity = await this.getActivityItem(trip, activityId);

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
    const activity = await this.getActivityItem(trip, activityId);

    trip.set({
      activities: trip.activities.filter(
        (activity) => activity.id !== activityId
      ),
    });

    await trip.save();

    return activity;
  };

  public static getAllUserSnaps = async (userId: string) => {
    const activatedTrip = await this.getActivatedTrip(userId);

    const snaps = await Snap.find({ userId, tripId: activatedTrip?.id });

    return snaps;
  };

  public static createTripSnap = async (snap: ISnap) => {
    const activatedTrip = await this.getActivatedTrip(snap.userId);

    const createdSnap = await Snap.create({
      ...snap,
      tripId: activatedTrip?.id,
    });

    return createdSnap;
  }
}
