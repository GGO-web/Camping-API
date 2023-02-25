Object.defineProperty(exports, '__esModule', { value: true });
exports.TripController = void 0;
const TripEndpoints_1 = require('../../features/trip/routes/TripEndpoints');
const BagEndpoints_1 = require('../../features/trip/routes/BagEndpoints');
const ActivityEndpoints_1 = require('../../features/trip/routes/ActivityEndpoints');
const SnapsEndpoints_1 = require('../../features/trip/routes/SnapsEndpoints');
const TeammatesEndpoints_1 = require('../../features/trip/routes/TeammatesEndpoints');

exports.TripController = {
  // Trip endpoints
  getAllUserTrips: TripEndpoints_1.getAllUserTrips,
  getActivatedTrip: TripEndpoints_1.getActivatedTrip,
  createTrip: TripEndpoints_1.createTrip,
  activateTrip: TripEndpoints_1.activateTrip,
  completeTrip: TripEndpoints_1.completeTrip,
  deactivateTrip: TripEndpoints_1.deactivateTrip,
  deleteTrip: TripEndpoints_1.deleteTrip,
  // Bag endpoints
  getBagItems: BagEndpoints_1.getBagItems,
  addBagItem: BagEndpoints_1.addBagItem,
  updateBagImage: BagEndpoints_1.updateBagImage,
  updateBagItemCount: BagEndpoints_1.updateBagItemCount,
  deleteBagItem: BagEndpoints_1.deleteBagItem,
  // Activity endpoints
  getActivities: ActivityEndpoints_1.getActivities,
  addActivity: ActivityEndpoints_1.addActivity,
  setActivityCompleted: ActivityEndpoints_1.setActivityCompleted,
  deleteActivity: ActivityEndpoints_1.deleteActivity,
  // Snap endpoints
  getAllUserTripSnaps: SnapsEndpoints_1.getAllUserTripSnaps,
  createTripSnap: SnapsEndpoints_1.createTripSnap,
  // Teammate endpoints
  getAllUserTeammates: TeammatesEndpoints_1.getAllUserTeammates,
  addTeammate: TeammatesEndpoints_1.addTeammate,
  deleteTeammate: TeammatesEndpoints_1.deleteTeammate,
};
