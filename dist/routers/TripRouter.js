"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripRouter = void 0;
const express_1 = __importDefault(require("express"));
const TripController_1 = require("../controllers/TripController/TripController");
const asyncWrapper_1 = require("../helpers/asyncWrapper");
const router = express_1.default.Router();
// Trip routes
router.get("/all/:userId", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.getAllUserTrips));
router.post("/create", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.createTrip));
router.get("/activated/:userId", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.getActivatedTrip));
router.patch("/activate", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.activateTrip));
router.patch("/deactivate/:userId", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.deactivateTrip));
router.patch("/complete/:userId", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.completeTrip));
router.delete("/delete", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.deleteTrip));
// Bag routes
router.get("/bag/all/:userId", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.getBagItems));
router.post("/bag/:tripId", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.addBagItem));
router.patch("/bag/image", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.updateBagImage));
router.patch("/bag/count", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.updateBagItemCount));
router.delete("/bag/delete", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.deleteBagItem));
// Activity routes
router.get("/activity/all/:userId", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.getActivities));
router.post("/activity/:userId", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.addActivity));
router.patch("/activity/complete", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.setActivityCompleted));
router.delete("/activity/delete", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.deleteActivity));
// Snap routes
router.get("/snaps/:userId", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.getAllUserTripSnaps));
router.post("/snaps/create", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.createTripSnap));
// Teammates routes
router.get("/teammates/all/:userId", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.getAllUserTeammates));
router.post("/teammates/add", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.addTeammate));
router.delete("/teammates/delete", (0, asyncWrapper_1.asyncWrapper)(TripController_1.TripController.deleteTeammate));
exports.TripRouter = router;
