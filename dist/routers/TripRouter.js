"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripRouter = void 0;
const express_1 = __importDefault(require("express"));
const TripController_1 = require("../controllers/TripController");
const asyncWrapper_1 = require("../helpers/asyncWrapper");
const router = express_1.default.Router();
// Trip routes
router.get("/all", (0, asyncWrapper_1.asyncWrapper)(TripController_1.getAllTrips));
router.post("/create", (0, asyncWrapper_1.asyncWrapper)(TripController_1.createTrip));
router.get("/activated/:userId", (0, asyncWrapper_1.asyncWrapper)(TripController_1.getActivatedTrip));
router.patch("/complete/:userId", (0, asyncWrapper_1.asyncWrapper)(TripController_1.completeTrip));
router.delete("/:tripId", (0, asyncWrapper_1.asyncWrapper)(TripController_1.deleteTrip));
// Bag routes
router.post("/bag/:userId", (0, asyncWrapper_1.asyncWrapper)(TripController_1.addBagItem));
router.patch("/bag/image", (0, asyncWrapper_1.asyncWrapper)(TripController_1.updateBagImage));
router.patch("/bag/count", (0, asyncWrapper_1.asyncWrapper)(TripController_1.updateBagItemCount));
exports.TripRouter = router;
