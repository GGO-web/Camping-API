"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripService = void 0;
const Trip_model_1 = require("../models/Trip.model");
const Error_model_1 = require("../models/Error.model");
const isValidImageFormat_1 = require("../helpers/isValidImageFormat");
class TripService {
}
exports.TripService = TripService;
_a = TripService;
TripService.getTrip = (tripId) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield Trip_model_1.Trip.findById(tripId);
    if (!trip) {
        throw new Error_model_1.AppError("Trip is not found", 404);
    }
    return trip;
});
TripService.getActivatedTrip = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const activatedTrip = yield Trip_model_1.Trip.findOne({ userId, activated: true });
    if (!activatedTrip) {
        throw new Error_model_1.AppError("User has no activated trip", 404);
    }
    return activatedTrip;
});
TripService.getDontCompletedTrip = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const dontCompletedTrip = yield Trip_model_1.Trip.findOne({ userId, completed: false });
    if (!dontCompletedTrip) {
        throw new Error_model_1.AppError("User has no trips which is not completed yet", 404);
    }
    return dontCompletedTrip;
});
TripService.addBagItem = (tripId, bagItem) => __awaiter(void 0, void 0, void 0, function* () {
    // find trip by id because we can add item to trip which is not activated and not completed
    const trip = yield _a.getTrip(tripId);
    if (!trip) {
        throw new Error_model_1.AppError("User has no trips yet", 404);
    }
    // add bagItem to trip.bagItems array
    trip === null || trip === void 0 ? void 0 : trip.bagItems.push(bagItem);
    const savedTrip = yield (trip === null || trip === void 0 ? void 0 : trip.save());
    return savedTrip;
});
TripService.activateTrip = (userId, tripId) => __awaiter(void 0, void 0, void 0, function* () {
    const trips = yield Trip_model_1.Trip.find({ userId });
    trips.forEach((trip) => {
        trip.set({ activated: false });
        trip.save();
    });
    const currentTrip = yield Trip_model_1.Trip.findById({ _id: tripId });
    currentTrip === null || currentTrip === void 0 ? void 0 : currentTrip.set({ activated: true });
    yield (currentTrip === null || currentTrip === void 0 ? void 0 : currentTrip.save());
});
TripService.deleteTrip = (tripId) => __awaiter(void 0, void 0, void 0, function* () {
    const removedTrip = yield Trip_model_1.Trip.findByIdAndDelete(tripId);
    if (!removedTrip) {
        throw new Error_model_1.AppError("Trip is not found or already removed", 404);
    }
});
TripService.getBagItem = (trip, bagItemId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentBagItem = trip === null || trip === void 0 ? void 0 : trip.bagItems.find((bagItem) => bagItem.id === bagItemId);
    console.log(currentBagItem);
    if (!currentBagItem) {
        throw new Error_model_1.AppError(`Bag item with id ${bagItemId || "undefined"} is not found`, 404);
    }
    return currentBagItem;
});
TripService.updateBagImage = (userId, bagItemId, image) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield _a.getActivatedTrip(userId);
    // check if bag item with ID is present in trip
    yield _a.getBagItem(trip, bagItemId);
    if (!(0, isValidImageFormat_1.isValidImageFormat)(image)) {
        throw new Error_model_1.AppError("Image format is not allowed or incorrect. Use base64 instead", 404);
    }
    // format is valid set bag image
    trip.set({
        bagItems: trip.bagItems.map((bagItem) => bagItem.id === bagItemId
            ? Object.assign(Object.assign({}, bagItem), { image: image }) : bagItem),
    });
    yield trip.save();
});
TripService.updateBagItemCount = (userId, bagItemId, count) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield _a.getActivatedTrip(userId);
    // check if bag item with ID is present in trip
    yield _a.getBagItem(trip, bagItemId);
    trip.set({
        bagItems: trip.bagItems.map((bagItem) => bagItem.id === bagItemId
            ? Object.assign(Object.assign({}, bagItem), { count }) : bagItem),
    });
    yield trip.save();
});
TripService.deleteBagItem = (userId, bagItemId) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield _a.getActivatedTrip(userId);
    // check if bag item with ID is present in trip
    yield _a.getBagItem(trip, bagItemId);
    trip.set({
        bagItems: trip.bagItems.filter((bagItem) => bagItem.id !== bagItemId),
    });
    yield trip.save();
});
TripService.getActivityItem = (trip, activityId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentActivity = trip === null || trip === void 0 ? void 0 : trip.activities.find((activity) => activity.id === activityId);
    console.log(currentActivity);
    if (!currentActivity) {
        throw new Error_model_1.AppError(`Activity item with id ${activityId || "undefined"} is not found in activated trip`, 404);
    }
    return currentActivity;
});
TripService.addActivity = (userId, activity) => __awaiter(void 0, void 0, void 0, function* () {
    const activatedTrip = yield _a.getActivatedTrip(userId);
    activatedTrip === null || activatedTrip === void 0 ? void 0 : activatedTrip.activities.push(activity);
    yield (activatedTrip === null || activatedTrip === void 0 ? void 0 : activatedTrip.save());
});
TripService.setActivityCompleted = (userId, activityId) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield _a.getActivatedTrip(userId);
    // check if activity with ID is present in trip
    const activity = yield _a.getActivityItem(trip, activityId);
    if (activity.completed) {
        throw new Error_model_1.AppError("Activity has been already completed", 400);
    }
    trip.set({
        activities: trip.activities.map((activity) => activity.id === activityId
            ? Object.assign(Object.assign({}, activity), { completed: true }) : activity),
    });
    yield trip.save();
});
TripService.deleteActivity = (userId, activityId) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield _a.getActivatedTrip(userId);
    // check if activity with ID is present in trip
    yield _a.getActivityItem(trip, activityId);
    trip.set({
        activities: trip.activities.filter((activity) => activity.id !== activityId),
    });
    yield trip.save();
});