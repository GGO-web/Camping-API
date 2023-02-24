import { v4 } from "uuid";

import { ITrip } from "../trip.model";
import { TripService } from "../trip.service";

import { isValidImageFormat } from "../../../helpers/isValidImageFormat";

import { IBagItem } from "../../../models/Bag.model";
import { AppError } from "../../../models/Error.model";

export class BagService {
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
    const tripAsOwner = await TripService.getTrip(tripId, bagItem.userId);
    const tripAsTeammate = await TripService.getTripAsTeammate(
      tripId,
      bagItem.userId
    );

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
    const trip = await TripService.getActivatedTrip(userId);

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
    const trip = await TripService.getActivatedTrip(userId);

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
    const trip = await TripService.getActivatedTrip(userId);

    // check if bag item with ID is present in trip
    await this.getBagItem(userId, trip, bagItemId);

    trip.set({
      bagItems: trip.bagItems.filter((bagItem) => bagItem.id !== bagItemId),
    });

    await trip.save();
  };
}
