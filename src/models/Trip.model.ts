import { model, Schema } from "mongoose";

import { IBagItem } from "./Bag.model";
import { IUser } from "./User.model";
import { IActivity } from "./Activity.model";

export interface ITripPeriod {
  startDate: Date;
  endDate: Date;
  formatted: string;
}

export interface ITrip {
  // trip _id field is predefined by mongoose
  tripName: string;
  locations: Object[];
  teammates: IUser[];
  tripPeriod: ITripPeriod;
  bagItems: IBagItem[];
  userId: string;
  activities: IActivity[];
  completed: boolean;
  activated: boolean;
}

const tripSchema = new Schema<ITrip>({
  userId: { type: String, required: true },
  tripName: { type: String, required: true },
  // locations is handled on frontend and different according to chosen API
  locations: { type: Array<Object>(), default: [], required: true },
  teammates: {
    type: [String],
    default: [],
  },
  tripPeriod: {
    type: {
      startDate: { type: Date, required: true },
      endDate: { type: Date },
      formatted: { type: String, required: true },
    },
    required: true,
  },
  bagItems: {
    type: [
      {
        id: { type: String },
        description: { type: String, required: true },
        image: { type: String },
        count: { type: Number, default: 1, required: true },
      },
    ],
    default: [],
  },
  activities: {
    type: [
      {
        id: { type: String, default: Date.now() },
        heading: { type: String, required: true },
        description: { type: String, required: true },
        completed: { type: Boolean, default: false },
      },
    ],
    default: [],
  },
  // trip is completed when user add all items to bag or skip this step
  completed: { type: Boolean, default: false },
  // trip is activated when user post trip data request
  activated: { type: Boolean, default: false },
});

export const Trip = model("trips", tripSchema);
