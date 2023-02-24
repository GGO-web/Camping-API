import express, { Router } from "express";

import {controller} from "./user.controller";

import { asyncWrapper } from "../../helpers/asyncWrapper";

const router: Router = express.Router();

// router.get("/all", asyncWrapper(controller.getAllUsers)); // only for development purposes
router.patch("/", asyncWrapper(controller.updateUserProfile));
router.get("/:id", asyncWrapper(controller.getUserById));
router.patch("/avatar", asyncWrapper(controller.updateUserAvatar));

export default router;
