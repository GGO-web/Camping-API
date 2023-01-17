import { ObjectId } from "mongoose";

import { IBagItem } from "../models/Bag.model";
import { Trip } from "../models/Trip.model";

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
    const trip =
      (await this.getActivatedTrip(userId)) ||
      (await this.getDontCompletedTrip(userId));

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

  public static updateBagImage = async (
    userId: string,
    bagItemId: string,
    image: string
  ) => {
    const trip = await this.getActivatedTrip(userId);

    console.log(trip);

    const currentBagItem = trip?.bagItems.find(
      (bagItem) => bagItem.id === bagItemId
    );

    if (!currentBagItem) {
      throw new AppError(
        `Bag item with id ${bagItemId || "undefined"} is not found`,
        404
      );
    }

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
              ...currentBagItem,
              image: image,
            }
          : bagItem
      ),
    });

    await trip.save();
  };
}
