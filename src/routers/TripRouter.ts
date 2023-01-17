import express, { Router } from "express";

import {
  addBagItem,
  completeTrip,
  createTrip,
  getActivatedTrip,
  getAllTrips,
  deleteTrip,
  updateBagImage,
} from "../controllers/TripController";

import { asyncWrapper } from "../helpers/asyncWrapper";

const router: Router = express.Router();

router.get("/all", asyncWrapper(getAllTrips));
router.post("/create", asyncWrapper(createTrip));
router.get("/activated/:userId", asyncWrapper(getActivatedTrip));
router.post("/bag/:userId", asyncWrapper(addBagItem));
router.patch("/bag/image", asyncWrapper(updateBagImage));
router.patch("/complete/:userId", asyncWrapper(completeTrip));
router.delete("/:tripId", asyncWrapper(deleteTrip));

export const TripRouter: Router = router;
