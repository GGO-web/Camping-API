import express, { Router } from "express";

import { controller } from "./trip.controller";

import { asyncWrapper } from "../../helpers/asyncWrapper";

const router: Router = express.Router();

// Trip routes
router.get("/all/:userId", asyncWrapper(controller.getAllUserTrips));
router.post("/create", asyncWrapper(controller.createTrip));
router.get("/activated/:userId", asyncWrapper(controller.getActivatedTrip));
router.patch("/activate", asyncWrapper(controller.activateTrip));
router.patch("/deactivate/:userId", asyncWrapper(controller.deactivateTrip));
router.patch("/complete/:userId", asyncWrapper(controller.completeTrip));
router.delete("/delete", asyncWrapper(controller.deleteTrip));

// Bag routes
router.get("/bag/all/:userId", asyncWrapper(controller.getBagItems));
router.post("/bag/:tripId", asyncWrapper(controller.addBagItem));
router.patch("/bag/image", asyncWrapper(controller.updateBagImage));
router.patch("/bag/count", asyncWrapper(controller.updateBagItemCount));
router.delete("/bag/delete", asyncWrapper(controller.deleteBagItem));

// Activity routes
router.get("/activity/all/:userId", asyncWrapper(controller.getActivities));
router.post("/activity/:userId", asyncWrapper(controller.addActivity));
router.patch(
  "/activity/complete",
  asyncWrapper(controller.setActivityCompleted)
);
router.delete("/activity/delete", asyncWrapper(controller.deleteActivity));

// Snap routes
router.get("/snaps/:userId", asyncWrapper(controller.getAllUserTripSnaps));
router.post("/snaps/create", asyncWrapper(controller.createTripSnap));

// Teammates routes
router.get(
  "/teammates/all/:userId",
  asyncWrapper(controller.getAllUserTeammates)
);
router.post("/teammates/add", asyncWrapper(controller.addTeammate));
router.delete("/teammates/delete", asyncWrapper(controller.deleteTeammate));

export default router;
