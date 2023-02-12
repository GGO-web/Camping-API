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
exports.TeammatesService = void 0;
const NotificationService_1 = require("./NotificationService");
const TripService_1 = require("./TripService");
const UserService_1 = require("./UserService");
const Error_model_1 = require("../models/Error.model");
class TeammatesService {
}
exports.TeammatesService = TeammatesService;
_a = TeammatesService;
TeammatesService.getAllUserTeammates = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const activatedTrip = yield TripService_1.TripService.getActivatedTrip(userId);
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
TeammatesService.addTeammate = (userId, teammateId) => __awaiter(void 0, void 0, void 0, function* () {
    const activatedTrip = yield TripService_1.TripService.getActivatedTrip(userId);
    const teammate = yield UserService_1.UserService.getUser(teammateId);
    if (RegExp(userId, "i").test(teammateId)) {
        throw new Error_model_1.AppError("You can't add yourself as a teammate", 400);
    }
    if (RegExp(activatedTrip.userId, "i").test(teammateId)) {
        throw new Error_model_1.AppError("You are trying to add trip owner, that's a bad idea :)", 400);
    }
    const isPresentAlready = activatedTrip === null || activatedTrip === void 0 ? void 0 : activatedTrip.teammates.some((teammate) => teammate.userId === teammateId);
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
    const user = yield UserService_1.UserService.getUser(userId);
    yield NotificationService_1.NotificationService.createNotification({
        userId: userId,
        title: "Teammate added to trip",
        message: `You added user (${teammate === null || teammate === void 0 ? void 0 : teammate.fullname}) successfully`,
        type: "success",
    });
    yield NotificationService_1.NotificationService.createNotification({
        userId: teammateId,
        title: `Invitation from ${user === null || user === void 0 ? void 0 : user.fullname}`,
        message: `You are invited to the trip (${activatedTrip.tripName})`,
        type: "success",
    });
});
TeammatesService.deleteTeammate = (userId, teammateId) => __awaiter(void 0, void 0, void 0, function* () {
    const activatedTrip = yield TripService_1.TripService.getActivatedTrip(userId);
    const teammateIsPresent = activatedTrip === null || activatedTrip === void 0 ? void 0 : activatedTrip.teammates.some((teammate) => teammate.userId === teammateId);
    if (!teammateIsPresent) {
        throw new Error_model_1.AppError("Teammate is not found or has been already removed", 404);
    }
    activatedTrip === null || activatedTrip === void 0 ? void 0 : activatedTrip.set({
        teammates: activatedTrip.teammates.filter((teammate) => teammate.userId !== teammateId),
    });
    yield (activatedTrip === null || activatedTrip === void 0 ? void 0 : activatedTrip.save());
    const teammate = yield UserService_1.UserService.getUser(teammateId);
    yield NotificationService_1.NotificationService.createNotification({
        userId: userId,
        title: "Teammate deleted from trip",
        message: `User (${teammate.fullname}) has been deleted from your trip`,
        type: "success",
    });
    yield NotificationService_1.NotificationService.createNotification({
        userId: teammateId,
        title: "Teammate deleted",
        message: `You are deleted from the trip (${activatedTrip.tripName})})`,
        type: "success",
    });
});
