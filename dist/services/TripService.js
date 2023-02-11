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
const uuid_1 = require("uuid");
const Snap_model_1 = require("../models/Snap.model");
const User_model_1 = require("../models/User.model");
const UserService_1 = require("./UserService");
class TripService {
}
exports.TripService = TripService;
_a = TripService;
TripService.getTrip = (tripId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield Trip_model_1.Trip.findOne({
        _id: tripId,
        "teammates.userId": userId,
    });
    return trip;
});
TripService.getTripAsTeammate = (tripId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield Trip_model_1.Trip.findOne({
        _id: tripId,
        "teammates.userId": userId,
    });
    return trip;
});
TripService.getAllUserTrips = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const ownTrips = yield Trip_model_1.Trip.find({ userId });
    const tripsAsTeammate = yield Trip_model_1.Trip.find({ "teammates.userId": userId });
    const activatedTripAsOwner = yield _a.getActivatedTripAsOwner(userId);
    const activatedTripAsTeammate = yield _a.getActivatedTripAsTeammate(userId);
    console.log(activatedTripAsOwner, activatedTripAsTeammate);
    if (activatedTripAsOwner && activatedTripAsTeammate) {
        return ownTrips;
    }
    return [...ownTrips, ...tripsAsTeammate];
});
TripService.getActivatedTripAsTeammate = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const activatedTripAsTeammate = yield Trip_model_1.Trip.findOne({
        "teammates.userId": userId,
        "teammates.isOnline": true,
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
    if (!activatedTrip) {
        const activatedTripAsTeammate = yield _a.getActivatedTripAsTeammate(userId);
        if (!activatedTripAsTeammate) {
            throw new Error_model_1.AppError("User has no activated trip", 404);
        }
        return activatedTripAsTeammate;
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
TripService.activateTrip = (userId, tripId) => __awaiter(void 0, void 0, void 0, function* () {
    const trips = yield Trip_model_1.Trip.find({ userId });
    const currentTrip = yield _a.getTrip(tripId, userId);
    const tripAsTeammate = yield _a.getTripAsTeammate(tripId, userId);
    if (!currentTrip && !tripAsTeammate) {
        throw new Error_model_1.AppError("Trip is not found", 404);
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
    // else if (tripsAsTeammate) {
    tripAsTeammate === null || tripAsTeammate === void 0 ? void 0 : tripAsTeammate.set({
        teammates: tripAsTeammate === null || tripAsTeammate === void 0 ? void 0 : tripAsTeammate.teammates.map((teammate) => {
            if (teammate.userId === userId) {
                return Object.assign(Object.assign({}, teammate), { isOnline: true });
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
    yield TripService.activateTrip(userId, savedTrip === null || savedTrip === void 0 ? void 0 : savedTrip.get("_id"));
    return savedTrip;
});
TripService.deactivateTrip = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield Trip_model_1.Trip.findOne({
        $or: [
            { userId: userId },
            { "teammates.userId": userId, "teammates.isOnline": true },
        ],
        activated: true,
    });
    const currentTrip = yield _a.getTrip(trip === null || trip === void 0 ? void 0 : trip.get("_id"), userId);
    const tripAsTeammate = yield _a.getTripAsTeammate(trip === null || trip === void 0 ? void 0 : trip.get("_id"), userId);
    if (!currentTrip && !tripAsTeammate) {
        throw new Error_model_1.AppError("User has no activated trip yet", 404);
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
                return Object.assign(Object.assign({}, teammate), { isOnline: false });
            }
        }),
    });
    yield (tripAsTeammate === null || tripAsTeammate === void 0 ? void 0 : tripAsTeammate.save());
    return tripAsTeammate;
});
TripService.deleteTrip = (userId, tripId) => __awaiter(void 0, void 0, void 0, function* () {
    const removedTrip = yield Trip_model_1.Trip.findOneAndDelete({ userId, _id: tripId });
    if (!removedTrip) {
        throw new Error_model_1.AppError("Trip is not found or already removed", 404);
    }
    return removedTrip;
});
TripService.getBagItem = (userId, trip, bagItemId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentBagItem = trip === null || trip === void 0 ? void 0 : trip.bagItems.find((bagItem) => bagItem.id === bagItemId);
    if (!currentBagItem) {
        throw new Error_model_1.AppError(`Bag item with id ${bagItemId || "undefined"} is not found`, 404);
    }
    if (currentBagItem.userId !== userId && trip.userId !== userId) {
        throw new Error_model_1.AppError("The user can only access their own belongings in the bag", 400);
    }
    return currentBagItem;
});
TripService.addBagItem = (tripId, bagItem) => __awaiter(void 0, void 0, void 0, function* () {
    const tripAsOwner = yield _a.getTrip(tripId, bagItem.userId);
    const tripAsTeammate = yield _a.getTripAsTeammate(tripId, bagItem.userId);
    const trip = tripAsOwner || tripAsTeammate;
    if (!trip) {
        throw new Error_model_1.AppError("User has no trips yet", 404);
    }
    // add bagItem to trip.bagItems array
    trip === null || trip === void 0 ? void 0 : trip.bagItems.push(Object.assign(Object.assign({}, bagItem), { id: (0, uuid_1.v4)() }));
    const savedTrip = yield (trip === null || trip === void 0 ? void 0 : trip.save());
    return savedTrip;
});
TripService.updateBagImage = (userId, bagItemId, image) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield _a.getActivatedTrip(userId);
    // check if bag item with ID is present in trip
    yield _a.getBagItem(userId, trip, bagItemId);
    if (!(0, isValidImageFormat_1.isValidImageFormat)(image)) {
        throw new Error_model_1.AppError("Image format is not allowed or incorrect. Use base64 instead", 400);
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
    yield _a.getBagItem(userId, trip, bagItemId);
    trip.set({
        bagItems: trip.bagItems.map((bagItem) => bagItem.id === bagItemId
            ? Object.assign(Object.assign({}, bagItem), { count }) : bagItem),
    });
    yield trip.save();
});
TripService.deleteBagItem = (userId, bagItemId) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield _a.getActivatedTrip(userId);
    // check if bag item with ID is present in trip
    yield _a.getBagItem(userId, trip, bagItemId);
    trip.set({
        bagItems: trip.bagItems.filter((bagItem) => bagItem.id !== bagItemId),
    });
    yield trip.save();
});
TripService.getActivityItem = (userId, trip, activityId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentActivity = trip === null || trip === void 0 ? void 0 : trip.activities.find((activity) => activity.id === activityId);
    if (!currentActivity) {
        throw new Error_model_1.AppError(`Activity item with id ${activityId || "undefined"} is not found in activated trip`, 404);
    }
    if (currentActivity.userId !== userId && trip.userId !== userId) {
        throw new Error_model_1.AppError("The user can only access their own activities", 400);
    }
    return currentActivity;
});
TripService.addActivity = (userId, activity) => __awaiter(void 0, void 0, void 0, function* () {
    const activatedTrip = yield _a.getActivatedTrip(userId);
    activatedTrip === null || activatedTrip === void 0 ? void 0 : activatedTrip.activities.push(Object.assign(Object.assign({}, activity), { userId, id: (0, uuid_1.v4)() }));
    yield (activatedTrip === null || activatedTrip === void 0 ? void 0 : activatedTrip.save());
});
TripService.setActivityCompleted = (userId, activityId) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield _a.getActivatedTrip(userId);
    // check if activity with ID is present in trip
    const activity = yield _a.getActivityItem(userId, trip, activityId);
    if (activity.completed) {
        throw new Error_model_1.AppError("Activity has been already completed", 400);
    }
    trip.set({
        activities: trip.activities.map((activity) => activity.id === activityId
            ? Object.assign(Object.assign({}, activity), { completed: true }) : activity),
    });
    yield trip.save();
    return activity;
});
TripService.deleteActivity = (userId, activityId) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield _a.getActivatedTrip(userId);
    // check if activity with ID is present in trip
    const activity = yield _a.getActivityItem(userId, trip, activityId);
    trip.set({
        activities: trip.activities.filter((activity) => activity.id !== activityId),
    });
    yield trip.save();
    return activity;
});
TripService.getAllUserSnaps = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const snaps = yield Snap_model_1.Snap.find({ userId });
    return snaps;
});
TripService.createTripSnap = (snap) => __awaiter(void 0, void 0, void 0, function* () {
    const createdSnap = yield Snap_model_1.Snap.create(snap);
    return createdSnap;
});
TripService.getAllUserTeammates = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const activatedTrip = yield _a.getActivatedTrip(userId);
    const teammates = [];
    for (let currentTeammate of activatedTrip === null || activatedTrip === void 0 ? void 0 : activatedTrip.teammates) {
        if (!currentTeammate) {
            continue;
        }
        const teammate = yield UserService_1.UserService.getUser(currentTeammate.userId);
        teammates.push(teammate);
    }
    return teammates;
});
TripService.isTeammatePresentInTrip = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const activatedTrip = yield _a.getActivatedTrip(userId);
    const teammate = activatedTrip === null || activatedTrip === void 0 ? void 0 : activatedTrip.teammates.find((teammate) => teammate.userId === userId);
    return teammate;
});
TripService.addTeammate = (userId, teammateId) => __awaiter(void 0, void 0, void 0, function* () {
    const activatedTrip = yield _a.getActivatedTrip(userId);
    const teammate = yield User_model_1.User.findOne({ uid: teammateId });
    if (RegExp(userId, "i").test(teammateId)) {
        throw new Error_model_1.AppError("You can't add yourself as a teammate", 400);
    }
    const isPresentAlready = yield _a.isTeammatePresentInTrip(userId);
    if (isPresentAlready) {
        throw new Error_model_1.AppError("Teammate is already added", 400);
    }
    if (!teammate) {
        throw new Error_model_1.AppError("Teammate is not found", 404);
    }
    activatedTrip === null || activatedTrip === void 0 ? void 0 : activatedTrip.teammates.push({
        userId: teammateId,
        isOnline: false,
    });
    yield (activatedTrip === null || activatedTrip === void 0 ? void 0 : activatedTrip.save());
});
TripService.deleteTeammate = (userId, teammateId) => __awaiter(void 0, void 0, void 0, function* () {
    const activatedTrip = yield _a.getActivatedTrip(userId);
    const teammateIsPresent = yield _a.isTeammatePresentInTrip(userId);
    if (!teammateIsPresent) {
        throw new Error_model_1.AppError("Teammate is not found or has been already removed", 404);
    }
    activatedTrip === null || activatedTrip === void 0 ? void 0 : activatedTrip.set({
        teammates: activatedTrip.teammates.filter((teammate) => teammate.userId !== teammateId),
    });
    yield (activatedTrip === null || activatedTrip === void 0 ? void 0 : activatedTrip.save());
});
