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
exports.getAllUserTripSnaps = void 0;
const snaps_service_1 = require("../snaps.service");
// Snaps endpoints
const getAllUserTripSnaps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const snaps = yield snaps_service_1.SnapsService.getAllUserSnaps(userId);
    return res.json(snaps);
});
exports.getAllUserTripSnaps = getAllUserTripSnaps;
exports.default = {
    route: exports.getAllUserTripSnaps,
    method: "get",
    path: "/:userId",
};
