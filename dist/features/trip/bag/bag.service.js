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
exports.BagService = void 0;
const uuid_1 = require("uuid");
const isValidImageFormat_1 = require("../../../helpers/isValidImageFormat");
const Error_model_1 = require("../../../models/Error.model");
const trip_service_1 = require("../index/trip.service");
class BagService {
}
exports.BagService = BagService;
_a = BagService;
BagService.getBagItem = (userId, trip, bagItemId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentBagItem = trip === null || trip === void 0 ? void 0 : trip.bagItems.find((bagItem) => bagItem.id === bagItemId);
    if (!currentBagItem) {
        throw new Error_model_1.AppError(`Bag item with id ${bagItemId || "undefined"} is not found`, 404);
    }
    if (currentBagItem.userId !== userId && trip.userId !== userId) {
        throw new Error_model_1.AppError("The user can only access their own belongings in the bag", 400);
    }
    return currentBagItem;
});
BagService.addBagItem = (tripId, bagItem) => __awaiter(void 0, void 0, void 0, function* () {
    const tripAsOwner = yield trip_service_1.TripService.getTrip(tripId, bagItem.userId);
    const tripAsTeammate = yield trip_service_1.TripService.getTripAsTeammate(tripId, bagItem.userId);
    const trip = tripAsOwner || tripAsTeammate;
    if (!trip) {
        throw new Error_model_1.AppError("User has no trips yet", 404);
    }
    // add bagItem to trip.bagItems array
    trip === null || trip === void 0 ? void 0 : trip.bagItems.push(Object.assign(Object.assign({}, bagItem), { id: (0, uuid_1.v4)() }));
    const savedTrip = yield (trip === null || trip === void 0 ? void 0 : trip.save());
    return savedTrip;
});
BagService.updateBagImage = (userId, bagItemId, image) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield trip_service_1.TripService.getActivatedTrip(userId);
    // check if bag item with ID is present in trip
    yield _a.getBagItem(userId, trip, bagItemId);
    if (!(0, isValidImageFormat_1.isValidImageFormat)(image)) {
        throw new Error_model_1.AppError("Image format is not allowed or incorrect. Use base64 instead", 400);
    }
    // format is valid set bag image
    trip.set({
        bagItems: trip.bagItems.map((bagItem) => bagItem.id === bagItemId
            ? Object.assign(Object.assign({}, bagItem), { image }) : bagItem),
    });
    yield trip.save();
});
BagService.updateBagItemCount = (userId, bagItemId, count) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield trip_service_1.TripService.getActivatedTrip(userId);
    // check if bag item with ID is present in trip
    yield _a.getBagItem(userId, trip, bagItemId);
    trip.set({
        bagItems: trip.bagItems.map((bagItem) => bagItem.id === bagItemId
            ? Object.assign(Object.assign({}, bagItem), { count }) : bagItem),
    });
    yield trip.save();
});
BagService.deleteBagItem = (userId, bagItemId) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield trip_service_1.TripService.getActivatedTrip(userId);
    // check if bag item with ID is present in trip
    yield _a.getBagItem(userId, trip, bagItemId);
    trip.set({
        bagItems: trip.bagItems.filter((bagItem) => bagItem.id !== bagItemId),
    });
    yield trip.save();
});
