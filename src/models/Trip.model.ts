import { model, Schema } from "mongoose";
import { IBagItem } from "./Bag.model";
import { ILocation } from "./Location.model";
import { IUser } from "./User.model";

export interface ITripPeriod {
  startDate: string;
  endDate: string;
  formatted: string;
}

export interface ITrip {
  // trip _id field is predefined by mongoose
  tripName: string;
  selectedLocations: ILocation[];
  teammates: IUser[];
  tripPeriod: ITripPeriod;
  bagItems: IBagItem[];
  userId: string;
}

const tripSchema = new Schema<ITrip>({
  tripName: { type: String, required: true },
  selectedLocations: { type: Array<ILocation>(), default: [], required: true },
  teammates: { type: Array<IUser>(), default: [], required: true },
  tripPeriod: {
    type: {
      startDate: { type: String, required: true },
      endDate: { type: String, required: true },
      formatted: { type: String, required: true },
    },
    required: true,
  },
  bagItems: { type: Array<IBagItem>(), default: [], required: true },
  userId: { type: String, required: true },
});

export const Trip = model("trips", tripSchema);
