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
exports.completeTrip = void 0;
const asyncWrapper_1 = require("../../../../helpers/asyncWrapper");
const withController_1 = require("../../../../helpers/withController");
const trip_service_1 = require("../trip.service");
const completeTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const savedTrip = yield trip_service_1.TripService.completeTrip(userId);
    return res.json({
        message: `Trip with id ${savedTrip === null || savedTrip === void 0 ? void 0 : savedTrip.get("_id")} completed successfully`
    });
});
exports.completeTrip = completeTrip;
exports.default = [
    (0, withController_1.withController)("/complete/:userId", "patch", (0, asyncWrapper_1.asyncWrapper)(exports.completeTrip))
];
