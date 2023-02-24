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
exports.deleteBagItem = exports.updateBagItemCount = exports.updateBagImage = exports.addBagItem = exports.getBagItems = void 0;
const BagService_1 = require("../../../services/BagService");
const TripService_1 = require("../../../services/TripService");
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
    yield BagService_1.BagService.addBagItem(tripId, bagItem);
    return res.json({ message: "Bag item added successfully" });
});
exports.addBagItem = addBagItem;
const updateBagImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bagItemId, image } = req.body;
    yield BagService_1.BagService.updateBagImage(userId, bagItemId, image);
    return res.json({ message: "Bag item image updated successfully" });
});
exports.updateBagImage = updateBagImage;
const updateBagItemCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bagItemId, count } = req.body;
    yield BagService_1.BagService.updateBagItemCount(userId, bagItemId, count);
    return res.json({ message: "Bag item count has been updated successfully" });
});
exports.updateBagItemCount = updateBagItemCount;
const deleteBagItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bagItemId } = req.query;
    yield BagService_1.BagService.deleteBagItem(userId, bagItemId);
    return res.json({ message: "Bag item has been deleted successfully" });
});
exports.deleteBagItem = deleteBagItem;
