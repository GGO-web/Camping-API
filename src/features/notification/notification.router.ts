import express, { Router } from "express";

import {controller} from "./notification.controller";

import { asyncWrapper } from "../../helpers/asyncWrapper";

const router: Router = express.Router();

// Notification routes
router.get("/all/:userId", asyncWrapper(controller.getAllNotifications));
router.post("/create", asyncWrapper(controller.createNotification));
router.delete("/delete/:id", asyncWrapper(controller.deleteNotification));


export default router;
