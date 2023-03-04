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
exports.ActivityService = void 0;
const uuid_1 = require("uuid");
const Error_model_1 = require("../../models/Error.model");
const notification_service_1 = require("../notification/notification.service");
const trip_service_1 = require("../trip/trip.service");
class ActivityService {
}
exports.ActivityService = ActivityService;
_a = ActivityService;
ActivityService.getActivityItem = (userId, trip, activityId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentActivity = trip === null || trip === void 0 ? void 0 : trip.activities.find((activity) => activity.id === activityId);
    if (!currentActivity) {
        throw new Error_model_1.AppError(`Activity item with id ${activityId || "undefined"} is not found in activated trip`, 404);
    }
    if (currentActivity.userId !== userId && trip.userId !== userId) {
        throw new Error_model_1.AppError("The user can only access their own activities", 400);
    }
    return currentActivity;
});
ActivityService.addActivity = (userId, activity) => __awaiter(void 0, void 0, void 0, function* () {
    const activatedTrip = yield trip_service_1.TripService.getActivatedTrip(userId);
    activatedTrip === null || activatedTrip === void 0 ? void 0 : activatedTrip.activities.push(Object.assign(Object.assign({}, activity), { userId, id: (0, uuid_1.v4)() }));
    yield (activatedTrip === null || activatedTrip === void 0 ? void 0 : activatedTrip.save());
    yield notification_service_1.NotificationService.createNotification({
        userId,
        title: "New activity",
        message: `Activity (${activity.heading}) has been added successfully`,
        type: "success",
    });
});
ActivityService.setActivityCompleted = (userId, activityId) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield trip_service_1.TripService.getActivatedTrip(userId);
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
    yield notification_service_1.NotificationService.createNotification({
        userId,
        title: "Completed activity",
        message: `Activity (${activity.heading}) completed successfully`,
        type: "success",
    });
    return activity;
});
ActivityService.deleteActivity = (userId, activityId) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield trip_service_1.TripService.getActivatedTrip(userId);
    // check if activity with ID is present in trip
    const activity = yield _a.getActivityItem(userId, trip, activityId);
    trip.set({
        activities: trip.activities.filter((activity) => activity.id !== activityId),
    });
    yield trip.save();
    yield notification_service_1.NotificationService.createNotification({
        userId,
        title: "Deleted activity",
        message: `Activity (${activity.heading}) has been deleted successfully`,
        type: "success",
    });
    return activity;
});
