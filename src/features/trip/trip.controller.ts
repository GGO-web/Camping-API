import {
  getAllUserTrips,
  getActivatedTrip,
  createTrip,
  completeTrip,
  activateTrip,
  deactivateTrip,
  deleteTrip,
} from "./routes/TripEndpoints";

import {
  getBagItems,
  addBagItem,
  updateBagImage,
  updateBagItemCount,
  deleteBagItem,
} from "./routes/BagEndpoints";

import {
  addActivity,
  deleteActivity,
  getActivities,
  setActivityCompleted,
} from "./routes/ActivityEndpoints";
import {
  getAllUserTripSnaps,
  createTripSnap,
} from "./routes/SnapsEndpoints";
import {
  addTeammate,
  deleteTeammate,
  getAllUserTeammates,
} from "./routes/TeammatesEndpoints";

export const controller = {
  // Trip endpoints
  getAllUserTrips,
  getActivatedTrip,
  createTrip,
  activateTrip,
  completeTrip,
  deactivateTrip,
  deleteTrip,

  // Bag endpoints
  getBagItems,
  addBagItem,
  updateBagImage,
  updateBagItemCount,
  deleteBagItem,

  // Activity endpoints
  getActivities,
  addActivity,
  setActivityCompleted,
  deleteActivity,

  // Snap endpoints
  getAllUserTripSnaps,
  createTripSnap,

  // Teammate endpoints
  getAllUserTeammates,
  addTeammate,
  deleteTeammate,
};
