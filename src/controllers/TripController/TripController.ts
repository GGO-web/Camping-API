import {
  getAllUserTrips,
  getActivatedTrip,
  createTrip,
  completeTrip,
  activateTrip,
  deactivateTrip,
  deleteTrip,
} from "./endpoints/TripEndpoints";

import {
  getBagItems,
  addBagItem,
  updateBagImage,
  updateBagItemCount,
  deleteBagItem,
} from "./endpoints/BagEndpoints";

import {
  addActivity,
  deleteActivity,
  getActivities,
  setActivityCompleted,
} from "./endpoints/ActivityEndpoints";
import {
  getAllUserTripSnaps,
  createTripSnap,
} from "./endpoints/SnapsEndpoints";
import {
  addTeammate,
  deleteTeammate,
  getAllUserTeammates,
} from "./endpoints/TeammatesEndpoints";

export const TripController = {
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
