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
exports.deleteActivity = exports.setActivityCompleted = exports.addActivity = exports.getActivities = void 0;
const trip_service_1 = require("../trip.service");
const activity_service_1 = require("../services/activity.service");
// Activity endpoints
const getActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const trip = yield trip_service_1.TripService.getActivatedTrip(userId);
    return res.json(trip.activities);
});
exports.getActivities = getActivities;
const addActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const activity = req.body;
    yield activity_service_1.ActivityService.addActivity(userId, activity);
    return res.json({ message: "Activity added successfully" });
});
exports.addActivity = addActivity;
const setActivityCompleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, activityId } = req.body;
    yield activity_service_1.ActivityService.setActivityCompleted(userId, activityId);
    return res.json({
        message: `Activity with id ${activityId} has been completed successfully`,
    });
});
exports.setActivityCompleted = setActivityCompleted;
const deleteActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, activityId } = req.query;
    yield activity_service_1.ActivityService.deleteActivity(userId, activityId);
    return res.json({
        message: `Activity with id ${activityId} has been deleted successfully`,
    });
});
exports.deleteActivity = deleteActivity;
