"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trip_controller_1 = require("./trip.controller");
const asyncWrapper_1 = require("../../helpers/asyncWrapper");
const router = express_1.default.Router();
// Trip routes
router.get("/all/:userId", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.getAllUserTrips));
router.post("/create", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.createTrip));
router.get("/activated/:userId", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.getActivatedTrip));
router.patch("/activate", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.activateTrip));
router.patch("/deactivate/:userId", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.deactivateTrip));
router.patch("/complete/:userId", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.completeTrip));
router.delete("/delete", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.deleteTrip));
// Bag routes
router.get("/bag/all/:userId", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.getBagItems));
router.post("/bag/:tripId", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.addBagItem));
router.patch("/bag/image", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.updateBagImage));
router.patch("/bag/count", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.updateBagItemCount));
router.delete("/bag/delete", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.deleteBagItem));
// Activity routes
router.get("/activity/all/:userId", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.getActivities));
router.post("/activity/:userId", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.addActivity));
router.patch("/activity/complete", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.setActivityCompleted));
router.delete("/activity/delete", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.deleteActivity));
// Snap routes
router.get("/snaps/:userId", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.getAllUserTripSnaps));
router.post("/snaps/create", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.createTripSnap));
// Teammates routes
router.get("/teammates/all/:userId", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.getAllUserTeammates));
router.post("/teammates/add", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.addTeammate));
router.delete("/teammates/delete", (0, asyncWrapper_1.asyncWrapper)(trip_controller_1.controller.deleteTeammate));
exports.default = router;
