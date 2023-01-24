import express, { Router } from "express";

import {
  getAllNotifications,
  createNotification,
  deleteNotification
} from "../controllers/NotificationController";

import { asyncWrapper } from "../helpers/asyncWrapper";

const router: Router = express.Router();

// Notification routes
router.get("/all/:userId", asyncWrapper(getAllNotifications));
router.post("/create", asyncWrapper(createNotification));
router.delete("/delete/:id", asyncWrapper(deleteNotification));

export const NotificationRouter: Router = router;
