import express, { Router } from "express";

import { asyncWrapper } from "../../helpers/asyncWrapper";

import { controller } from "./feedback.controller";

const router: Router = express.Router();

// Notification routes
router.get("/all/", asyncWrapper(controller.getAllFeedbacks));
router.get("/:userId", asyncWrapper(controller.getAllUserFeedbacks));
router.post("/create", asyncWrapper(controller.createFeedback));
router.delete("/delete", asyncWrapper(controller.deleteFeedback));


export default router;
