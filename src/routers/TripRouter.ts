import express, { Router } from "express";

import { TripController } from "../controllers/TripController/TripController";

import { asyncWrapper } from "../helpers/asyncWrapper";

const router: Router = express.Router();

// Trip routes
router.get("/all/:userId", asyncWrapper(TripController.getAllUserTrips));
router.post("/create", asyncWrapper(TripController.createTrip));
router.get("/activated/:userId", asyncWrapper(TripController.getActivatedTrip));
router.patch("/activate", asyncWrapper(TripController.activateTrip));
router.patch(
  "/deactivate/:userId",
  asyncWrapper(TripController.deactivateTrip)
);
router.patch("/complete/:userId", asyncWrapper(TripController.completeTrip));
router.delete("/delete", asyncWrapper(TripController.deleteTrip));

// Bag routes
router.get("/bag/all/:userId", asyncWrapper(TripController.getBagItems));
router.post("/bag/:tripId", asyncWrapper(TripController.addBagItem));
router.patch("/bag/image", asyncWrapper(TripController.updateBagImage));
router.patch("/bag/count", asyncWrapper(TripController.updateBagItemCount));
router.delete("/bag/delete", asyncWrapper(TripController.deleteBagItem));

// Activity routes
router.get("/activity/all/:userId", asyncWrapper(TripController.getActivities));
router.post("/activity/:userId", asyncWrapper(TripController.addActivity));
router.patch(
  "/activity/complete",
  asyncWrapper(TripController.setActivityCompleted)
);
router.delete("/activity/delete", asyncWrapper(TripController.deleteActivity));

// Snap routes
router.get("/snaps/:userId", asyncWrapper(TripController.getAllUserTripSnaps));
router.post("/snaps/create", asyncWrapper(TripController.createTripSnap));

// Teammates routes
router.get(
  "/teammates/all/:userId",
  asyncWrapper(TripController.getAllUserTeammates)
);
router.post("/teammates/add", asyncWrapper(TripController.addTeammate));
router.delete("/teammates/delete", asyncWrapper(TripController.deleteTeammate));

export const TripRouter: Router = router;
