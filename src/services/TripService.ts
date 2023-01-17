import { ObjectId } from "mongoose";

import { IBagItem } from "../models/Bag.model";
import { ITrip, Trip } from "../models/Trip.model";

import { isValidImageFormat } from "../helpers/isValidImageFormat";
import { AppError } from "../models/Error.model";

export class TripService {
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

  public static addBagItem = async (userId: string, bagItem: IBagItem) => {
    // fidn trip if is not completed or is activated
    const trip = await Trip.findOne({
      userId,
      $or: [
        {
          activated: true,
        },
        {
          completed: false,
        },
      ],
    });

    if (!trip) {
      throw new AppError("User has no trips yet", 404);
    }

    // add bagItem to trip.bagItems array
    trip?.bagItems.push(bagItem);

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
  };

  public static deleteTrip = async (tripId: string) => {
    const removedTrip = await Trip.findByIdAndDelete(tripId);

    if (!removedTrip) {
      throw new AppError("Trip is not found or already removed", 404);
    }
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
        404
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
}
