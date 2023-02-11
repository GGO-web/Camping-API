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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeammate = exports.addTeammate = exports.getAllUserTeammates = exports.createTripSnap = exports.getAllUserTripSnaps = exports.deleteActivity = exports.setActivityCompleted = exports.addActivity = exports.getActivities = exports.deleteBagItem = exports.updateBagItemCount = exports.updateBagImage = exports.addBagItem = exports.getBagItems = exports.deleteTrip = exports.completeTrip = exports.getActivatedTrip = exports.deactivateTrip = exports.activateTrip = exports.createTrip = exports.getAllUserTrips = void 0;
const TripService_1 = require("../services/TripService");
const NotificationService_1 = require("../services/NotificationService");
const UserService_1 = require("../services/UserService");
const Trip_model_1 = require("../models/Trip.model");
// Trip endpoints
const getAllUserTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const trips = yield TripService_1.TripService.getAllUserTrips(userId);
    return res.json(trips);
});
exports.getAllUserTrips = getAllUserTrips;
const createTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { tripName, tripPeriod, userId } = _a, otherTripParams = __rest(_a, ["tripName", "tripPeriod", "userId"]);
    const trip = new Trip_model_1.Trip(Object.assign({ userId, tripName, tripPeriod }, otherTripParams));
    const savedTrip = yield trip.save();
    yield NotificationService_1.NotificationService.createNotification({
        userId,
        title: "Trip created",
        message: `Trip (${tripName}) has been created successfully`,
        type: "success",
    });
    return res.json(savedTrip);
});
exports.createTrip = createTrip;
const activateTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, tripId } = req.body;
    yield TripService_1.TripService.activateTrip(userId, tripId);
    return res.json({ message: "Trip activated successfully" });
});
exports.activateTrip = activateTrip;
const deactivateTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    yield TripService_1.TripService.deactivateTrip(userId);
    return res.json({ message: "Trip deactivated successfully" });
});
exports.deactivateTrip = deactivateTrip;
const getActivatedTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const trip = yield TripService_1.TripService.getActivatedTrip(userId);
    return res.json(trip);
});
exports.getActivatedTrip = getActivatedTrip;
const completeTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const savedTrip = yield TripService_1.TripService.completeTrip(userId);
    return res.json({
        message: `Trip with id ${savedTrip === null || savedTrip === void 0 ? void 0 : savedTrip.get("_id")} completed successfully`,
    });
});
exports.completeTrip = completeTrip;
const deleteTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, tripId } = req.query;
    const trip = yield TripService_1.TripService.deleteTrip(userId, tripId);
    yield NotificationService_1.NotificationService.createNotification({
        userId,
        title: "Trip deleted",
        message: `Trip (${trip === null || trip === void 0 ? void 0 : trip.tripName} is unavailable and all data is removed, except your snaps`,
        type: "success",
    });
    return res.json({ message: "Trip deleted successfully" });
});
exports.deleteTrip = deleteTrip;
// Bag endpoints
const getBagItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const trip = yield TripService_1.TripService.getActivatedTrip(userId);
    return res.json(trip.bagItems);
});
exports.getBagItems = getBagItems;
const addBagItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tripId } = req.params;
    const bagItem = req.body;
    yield TripService_1.TripService.addBagItem(tripId, bagItem);
    return res.json({ message: "Bag item added successfully" });
});
exports.addBagItem = addBagItem;
const updateBagImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bagItemId, image } = req.body;
    yield TripService_1.TripService.updateBagImage(userId, bagItemId, image);
    return res.json({ message: "Bag item image updated successfully" });
});
exports.updateBagImage = updateBagImage;
const updateBagItemCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bagItemId, count } = req.body;
    yield TripService_1.TripService.updateBagItemCount(userId, bagItemId, count);
    return res.json({ message: "Bag item count has been updated successfully" });
});
exports.updateBagItemCount = updateBagItemCount;
const deleteBagItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bagItemId } = req.query;
    yield TripService_1.TripService.deleteBagItem(userId, bagItemId);
    return res.json({ message: "Bag item has been deleted successfully" });
});
exports.deleteBagItem = deleteBagItem;
// Activity endpoints
const getActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const trip = yield TripService_1.TripService.getActivatedTrip(userId);
    return res.json(trip.activities);
});
exports.getActivities = getActivities;
const addActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const activity = req.body;
    yield TripService_1.TripService.addActivity(userId, activity);
    yield NotificationService_1.NotificationService.createNotification({
        userId,
        title: "New activity",
        message: `Activity (${activity.heading}) has been added successfully`,
        type: "success",
    });
    return res.json({ message: "Activity added successfully" });
});
exports.addActivity = addActivity;
const setActivityCompleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, activityId } = req.body;
    const activity = yield TripService_1.TripService.setActivityCompleted(userId, activityId);
    yield NotificationService_1.NotificationService.createNotification({
        userId,
        title: "Completed activity",
        message: `Activity (${activity.heading}) completed successfully`,
        type: "success",
    });
    return res.json({
        message: `Activity with id ${activityId} has been completed successfully`,
    });
});
exports.setActivityCompleted = setActivityCompleted;
const deleteActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, activityId } = req.query;
    const activity = yield TripService_1.TripService.deleteActivity(userId, activityId);
    yield NotificationService_1.NotificationService.createNotification({
        userId,
        title: "Deleted activity",
        message: `Activity (${activity.heading}) has been deleted successfully`,
        type: "success",
    });
    return res.json({
        message: `Activity with id ${activityId} has been deleted successfully`,
    });
});
exports.deleteActivity = deleteActivity;
// Snaps endpoints
const getAllUserTripSnaps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const snaps = yield TripService_1.TripService.getAllUserSnaps(userId);
    return res.json(snaps);
});
exports.getAllUserTripSnaps = getAllUserTripSnaps;
const createTripSnap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const snap = req.body;
    const createdSnap = yield TripService_1.TripService.createTripSnap(snap);
    return res.json({
        message: `Snap with id ${createdSnap._id} has been created successfully`,
    });
});
exports.createTripSnap = createTripSnap;
// Teammates endpoints
const getAllUserTeammates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const teammates = yield TripService_1.TripService.getAllUserTeammates(userId);
    return res.json(teammates);
});
exports.getAllUserTeammates = getAllUserTeammates;
const addTeammate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, teammateId } = req.body;
    const user = yield UserService_1.UserService.getUser(userId);
    const teammate = yield UserService_1.UserService.getUser(teammateId);
    const activatedTrip = yield TripService_1.TripService.getActivatedTrip(userId);
    yield TripService_1.TripService.addTeammate(userId, teammateId);
    yield NotificationService_1.NotificationService.createNotification({
        userId: userId,
        title: "Teammate added to trip",
        message: `You added user (${userId === null || userId === void 0 ? void 0 : userId.fullname}) successfully`,
        type: "success",
    });
    yield NotificationService_1.NotificationService.createNotification({
        userId: teammateId,
        title: `Invitation from ${user === null || user === void 0 ? void 0 : user.fullname}`,
        message: `You are invited to the trip (${activatedTrip.tripName})`,
        type: "success",
    });
    return res.json({ message: "Teammate added successfully" });
});
exports.addTeammate = addTeammate;
const deleteTeammate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, teammateId } = req.query;
    yield TripService_1.TripService.deleteTeammate(userId, teammateId);
    const teammate = yield UserService_1.UserService.getUser(teammateId);
    yield NotificationService_1.NotificationService.createNotification({
        userId: teammateId,
        title: "Teammate deleted from trip",
        message: `User (${teammate.fullname}) has been deleted from your trip`,
        type: "success",
    });
    return res.json({ message: "Teammate deleted successfully" });
});
exports.deleteTeammate = deleteTeammate;
