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
const isValidImageFormat_1 = require("../helpers/isValidImageFormat");
const Error_model_1 = require("../models/Error.model");
class TripService {
}
exports.TripService = TripService;
_a = TripService;
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
TripService.addBagItem = (userId, bagItem) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = (yield _a.getActivatedTrip(userId)) ||
        (yield _a.getDontCompletedTrip(userId));
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
TripService.updateBagImage = (userId, bagItemId, image) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield _a.getActivatedTrip(userId);
    console.log(trip);
    const currentBagItem = trip === null || trip === void 0 ? void 0 : trip.bagItems.find((bagItem) => bagItem.id === bagItemId);
    if (!currentBagItem) {
        throw new Error_model_1.AppError(`Bag item with id ${bagItemId || "undefined"} is not found`, 404);
    }
    if (!(0, isValidImageFormat_1.isValidImageFormat)(image)) {
        throw new Error_model_1.AppError("Image format is not allowed or incorrect. Use base64 instead", 404);
    }
    // format is valid set bag image
    trip.set({
        bagItems: trip.bagItems.map((bagItem) => bagItem.id === bagItemId
            ? Object.assign(Object.assign({}, currentBagItem), { image: image }) : bagItem),
    });
    yield trip.save();
});
