const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P((resolve) => { resolve(value); }); }
  return new (P || (P = Promise))((resolve, reject) => {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
let _a;
Object.defineProperty(exports, '__esModule', { value: true });
exports.TripService = void 0;
const NotificationService_1 = require('./NotificationService');
const Trip_model_1 = require('../models/Trip.model');
const Error_model_1 = require('../models/Error.model');

class TripService {
}
exports.TripService = TripService;
_a = TripService;
TripService.getTrip = (tripId, userId) => __awaiter(void 0, void 0, void 0, function* () {
  const trip = yield Trip_model_1.Trip.findOne({
    _id: tripId,
    userId,
  });
  return trip;
});
TripService.getTripAsTeammate = (tripId, userId) => __awaiter(void 0, void 0, void 0, function* () {
  const trip = yield Trip_model_1.Trip.findOne({
    _id: tripId,
    'teammates.userId': userId,
  });
  return trip;
});
TripService.getAllUserTrips = (userId) => __awaiter(void 0, void 0, void 0, function* () {
  const ownTrips = yield Trip_model_1.Trip.find({ userId });
  const tripsAsTeammate = yield Trip_model_1.Trip.find({
    'teammates.userId': userId,
    activated: true,
  });
  return [...ownTrips, ...tripsAsTeammate];
});
TripService.getActivatedTripAsTeammate = (userId) => __awaiter(void 0, void 0, void 0, function* () {
  const activatedTripAsTeammate = yield Trip_model_1.Trip.findOne({
    'teammates.userId': userId,
    'teammates.isOnline': true,
    activated: true,
  });
  return activatedTripAsTeammate;
});
TripService.getActivatedTripAsOwner = (userId) => __awaiter(void 0, void 0, void 0, function* () {
  const activatedTripAsOwner = yield Trip_model_1.Trip.findOne({
    userId,
    activated: true,
  });
  return activatedTripAsOwner;
});
TripService.getActivatedTrip = (userId) => __awaiter(void 0, void 0, void 0, function* () {
  const activatedTrip = yield _a.getActivatedTripAsOwner(userId);
  if (activatedTrip) {
    return activatedTrip;
  }
  const activatedTripAsTeammate = yield _a.getActivatedTripAsTeammate(userId);
  if (!activatedTripAsTeammate) {
    throw new Error_model_1.AppError('User has no activated trip', 404);
  }
  return activatedTripAsTeammate;
});
TripService.getDontCompletedTrip = (userId) => __awaiter(void 0, void 0, void 0, function* () {
  const dontCompletedTrip = yield Trip_model_1.Trip.findOne({ userId, completed: false });
  if (!dontCompletedTrip) {
    throw new Error_model_1.AppError('User has no trips which is not completed yet', 404);
  }
  return dontCompletedTrip;
});
TripService.createTrip = (trip) => __awaiter(void 0, void 0, void 0, function* () {
  const { userId, tripName } = trip;
  const newTrip = new Trip_model_1.Trip(trip);
  yield newTrip.save();
  yield NotificationService_1.NotificationService.createNotification({
    userId,
    title: 'Trip created',
    message: `Trip (${tripName}) has been created successfully`,
    type: 'success',
  });
  return newTrip;
});
TripService.activateTrip = (userId, tripId) => __awaiter(void 0, void 0, void 0, function* () {
  const trips = yield Trip_model_1.Trip.find({ userId });
  const currentTrip = yield _a.getTrip(tripId, userId);
  const tripAsTeammate = yield _a.getTripAsTeammate(tripId, userId);
  if (!currentTrip && !tripAsTeammate) {
    throw new Error_model_1.AppError('Trip is not found', 404);
  }
  trips.forEach((trip) => {
    trip.set({ activated: false });
    trip.save();
  });
  if (currentTrip) {
    currentTrip === null || currentTrip === void 0 ? void 0 : currentTrip.set({ activated: true });
    yield (currentTrip === null || currentTrip === void 0 ? void 0 : currentTrip.save());
    return currentTrip;
  }
  if (!(tripAsTeammate === null || tripAsTeammate === void 0 ? void 0 : tripAsTeammate.activated)) {
    throw new Error_model_1.AppError("Trip is disabled by owner and you can't enter it", 400);
  }
  // else if (tripsAsTeammate) {
  tripAsTeammate === null || tripAsTeammate === void 0 ? void 0 : tripAsTeammate.set({
    teammates: tripAsTeammate === null || tripAsTeammate === void 0 ? void 0 : tripAsTeammate.teammates.map((teammate) => {
      if (teammate.userId === userId) {
        return { ...teammate, isOnline: true };
      }
    }),
  });
  yield (tripAsTeammate === null || tripAsTeammate === void 0 ? void 0 : tripAsTeammate.save());
  return tripAsTeammate;
});
TripService.completeTrip = (userId) => __awaiter(void 0, void 0, void 0, function* () {
  const trip = yield TripService.getDontCompletedTrip(userId);
  trip === null || trip === void 0 ? void 0 : trip.set({ completed: true });
  const savedTrip = yield (trip === null || trip === void 0 ? void 0 : trip.save());
  yield TripService.activateTrip(userId, savedTrip === null || savedTrip === void 0 ? void 0 : savedTrip.get('_id'));
  return savedTrip;
});
TripService.deactivateTrip = (userId) => __awaiter(void 0, void 0, void 0, function* () {
  const trip = yield Trip_model_1.Trip.findOne({
    $or: [
      { userId },
      { 'teammates.userId': userId, 'teammates.isOnline': true },
    ],
    activated: true,
  });
  const currentTrip = yield _a.getTrip(trip === null || trip === void 0 ? void 0 : trip.get('_id').toString(), userId);
  const tripAsTeammate = yield _a.getTripAsTeammate(trip === null || trip === void 0 ? void 0 : trip.get('_id').toString(), userId);
  if (!currentTrip && !tripAsTeammate) {
    throw new Error_model_1.AppError('User has no activated trip yet', 404);
  }
  if (currentTrip) {
    currentTrip === null || currentTrip === void 0 ? void 0 : currentTrip.set({ activated: false });
    yield (currentTrip === null || currentTrip === void 0 ? void 0 : currentTrip.save());
    return currentTrip;
  }
  // else if (tripsAsTeammate) {
  tripAsTeammate === null || tripAsTeammate === void 0 ? void 0 : tripAsTeammate.set({
    teammates: tripAsTeammate === null || tripAsTeammate === void 0 ? void 0 : tripAsTeammate.teammates.map((teammate) => {
      if (teammate.userId === userId) {
        return { ...teammate, isOnline: false };
      }
    }),
  });
  yield (tripAsTeammate === null || tripAsTeammate === void 0 ? void 0 : tripAsTeammate.save());
  return tripAsTeammate;
});
TripService.deleteTrip = (userId, tripId) => __awaiter(void 0, void 0, void 0, function* () {
  const removedTrip = yield Trip_model_1.Trip.findOneAndDelete({ userId, _id: tripId });
  if (!removedTrip) {
    throw new Error_model_1.AppError('Trip is not found or already removed', 404);
  }
  yield NotificationService_1.NotificationService.createNotification({
    userId,
    title: 'Trip deleted',
    message: `Trip (${removedTrip === null || removedTrip === void 0 ? void 0 : removedTrip.tripName} is unavailable and all data is removed, except your snaps`,
    type: 'success',
  });
  return removedTrip;
});
