import { ObjectId } from "mongoose";

import { IBagItem } from "../models/Bag.model";
import { Trip } from "../models/Trip.model";

export class TripService {
  public static getActivatedTrip = async (userId: string) => {
    const activatedTrip = await Trip.findOne({ userId, activated: true });

    if (!activatedTrip) {
      throw new Error("User has no activated trip");
    }

    return activatedTrip;
  };

  public static getDontCompletedTrip = async (userId: string) => {
    const dontCompletedTrip = await Trip.findOne({ userId, completed: false });

    if (!dontCompletedTrip) {
      throw new Error("User has no trips which is not completed yet");
    }

    return dontCompletedTrip;
  };

  public static addBagItem = async (userId: string, bagItem: IBagItem) => {
    const activatedTrip = await this.getActivatedTrip(userId);
    const dontCompletedTrip = await this.getDontCompletedTrip(userId);

    const trip = activatedTrip || dontCompletedTrip;

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
}
