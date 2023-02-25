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
exports.getBagItems = void 0;
const trip_service_1 = require("../../trip/trip.service");
const getBagItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const trip = yield trip_service_1.TripService.getActivatedTrip(userId);
    return res.json(trip.bagItems);
});
exports.getBagItems = getBagItems;
exports.default = {
    route: exports.getBagItems,
    method: "get",
    path: "/all/:userId",
};
