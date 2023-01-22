import express, { Router } from "express";

import {
  addBagItem,
  completeTrip,
  createTrip,
  activateTrip,
  deactivateTrip,
  getActivatedTrip,
  getAllUserTrips,
  deleteTrip,
  updateBagImage,
  updateBagItemCount,
  deleteBagItem,
  addActivity,
  setActivityCompleted,
  deleteActivity,
  getBagItems,
  getActivities,
} from "../controllers/TripController";

import { asyncWrapper } from "../helpers/asyncWrapper";

const router: Router = express.Router();

// Trip routes
router.get("/all/:userId", asyncWrapper(getAllUserTrips));
router.post("/create", asyncWrapper(createTrip));
router.get("/activated/:userId", asyncWrapper(getActivatedTrip));
router.patch("/activate", asyncWrapper(activateTrip));
router.patch("/deactivate/:userId", asyncWrapper(deactivateTrip));
router.patch("/complete/:userId", asyncWrapper(completeTrip));
router.delete("/delete", asyncWrapper(deleteTrip));

// Bag routes
router.get("/bag/all/:userId", asyncWrapper(getBagItems));
router.post("/bag/:tripId", asyncWrapper(addBagItem));
router.patch("/bag/image", asyncWrapper(updateBagImage));
router.patch("/bag/count", asyncWrapper(updateBagItemCount));
router.delete("/bag/delete", asyncWrapper(deleteBagItem));

// Activity routes
router.get("/activity/all/:userId", asyncWrapper(getActivities));
router.post("/activity/:userId", asyncWrapper(addActivity));
router.patch("/activity/complete", asyncWrapper(setActivityCompleted));
router.delete("/activity/delete", asyncWrapper(deleteActivity));

export const TripRouter: Router = router;
