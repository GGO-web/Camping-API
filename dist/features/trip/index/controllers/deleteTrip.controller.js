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
exports.deleteTrip = void 0;
const asyncWrapper_1 = require("../../../../helpers/asyncWrapper");
const withController_1 = require("../../../../helpers/withController");
const trip_service_1 = require("../trip.service");
const deleteTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, tripId } = req.query;
    yield trip_service_1.TripService.deleteTrip(userId, tripId);
    return res.json({ message: "Trip deleted successfully" });
});
exports.deleteTrip = deleteTrip;
exports.default = [(0, withController_1.withController)("/delete", "delete", (0, asyncWrapper_1.asyncWrapper)(exports.deleteTrip))];
