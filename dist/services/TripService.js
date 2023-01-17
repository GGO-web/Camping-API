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
class TripService {
}
exports.TripService = TripService;
_a = TripService;
TripService.getActivatedTrip = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const activatedTrip = yield Trip_model_1.Trip.findOne({ userId, activated: true });
    if (!activatedTrip) {
        throw new Error("User has no activated trip");
    }
    return activatedTrip;
});
TripService.getDontCompletedTrip = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const dontCompletedTrip = yield Trip_model_1.Trip.findOne({ userId, completed: false });
    if (!dontCompletedTrip) {
        throw new Error("User has no trips which is not completed yet");
    }
    return dontCompletedTrip;
});
TripService.addBagItem = (userId, bagItem) => __awaiter(void 0, void 0, void 0, function* () {
    const activatedTrip = yield _a.getActivatedTrip(userId);
    const dontCompletedTrip = yield _a.getDontCompletedTrip(userId);
    const trip = activatedTrip || dontCompletedTrip;
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
