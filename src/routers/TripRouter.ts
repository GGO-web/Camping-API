import express, { Router } from "express";

import {
  addBagItem,
  completeTrip,
  createTrip,
  getActivatedTrip,
  getAllTrips,
  deleteTrip,
  updateBagImage,
  updateBagItemCount,
  deleteBagItem,
} from "../controllers/TripController";

import { asyncWrapper } from "../helpers/asyncWrapper";

const router: Router = express.Router();

// Trip routes
router.get("/all", asyncWrapper(getAllTrips));
router.post("/create", asyncWrapper(createTrip));
router.get("/activated/:userId", asyncWrapper(getActivatedTrip));
router.patch("/complete/:userId", asyncWrapper(completeTrip));
router.delete("/:tripId", asyncWrapper(deleteTrip));

// Bag routes
router.post("/bag/:userId", asyncWrapper(addBagItem));
router.patch("/bag/image", asyncWrapper(updateBagImage));
router.patch("/bag/count", asyncWrapper(updateBagItemCount));
router.delete("/bag/delete", asyncWrapper(deleteBagItem));

export const TripRouter: Router = router;
