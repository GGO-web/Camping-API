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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteActivity = exports.setActivityCompleted = exports.addActivity = exports.deleteBagItem = exports.updateBagItemCount = exports.updateBagImage = exports.addBagItem = exports.deleteTrip = exports.completeTrip = exports.getActivatedTrip = exports.activateTrip = exports.createTrip = exports.getAllTrips = void 0;
const TripService_1 = require("../services/TripService");
const Trip_model_1 = require("../models/Trip.model");
// Trip endpoints
const getAllTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trips = yield Trip_model_1.Trip.find();
    return res.json(trips);
});
exports.getAllTrips = getAllTrips;
const createTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tripName, tripPeriod, userId } = req.body;
    const trip = new Trip_model_1.Trip({ userId, tripName, tripPeriod });
    const savedTrip = yield trip.save();
    return res.json(savedTrip);
});
exports.createTrip = createTrip;
const activateTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, tripId } = req.body;
    yield TripService_1.TripService.activateTrip(userId, tripId);
    return res.json({ message: "Trip activated successfully" });
});
exports.activateTrip = activateTrip;
const getActivatedTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const trip = yield TripService_1.TripService.getActivatedTrip(userId);
    return res.json(trip);
});
exports.getActivatedTrip = getActivatedTrip;
const completeTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const trip = yield TripService_1.TripService.getDontCompletedTrip(userId);
    trip === null || trip === void 0 ? void 0 : trip.set({ completed: true });
    const savedTrip = yield (trip === null || trip === void 0 ? void 0 : trip.save());
    TripService_1.TripService.activateTrip(userId, savedTrip === null || savedTrip === void 0 ? void 0 : savedTrip.get("_id"));
    return res.json({
        message: `Trip with id ${savedTrip === null || savedTrip === void 0 ? void 0 : savedTrip.get("_id")} completed successfully`,
    });
});
exports.completeTrip = completeTrip;
const deleteTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tripId } = req.params;
    yield TripService_1.TripService.deleteTrip(tripId);
    return res.json({ message: "Trip deleted successfully" });
});
exports.deleteTrip = deleteTrip;
// Bag endpoints
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
const addActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const activity = req.body;
    yield TripService_1.TripService.addActivity(userId, activity);
    return res.json({ message: "Activity added successfully" });
});
exports.addActivity = addActivity;
const setActivityCompleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, activityId } = req.body;
    yield TripService_1.TripService.setActivityCompleted(userId, activityId);
    return res.json({
        message: `Activity with id ${activityId} has been completed successfully`,
    });
});
exports.setActivityCompleted = setActivityCompleted;
const deleteActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, activityId } = req.query;
    console.log(userId, activityId);
    yield TripService_1.TripService.deleteActivity(userId, activityId);
    return res.json({
        message: `Activity with id ${activityId} has been deleted successfully`,
    });
});
exports.deleteActivity = deleteActivity;
