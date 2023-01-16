import express, { Router } from "express";

import {
  getAllUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} from "../controllers/UserController";

import { asyncWrapper } from "../helpers/asyncWrapper";

const router: Router = express.Router();

router.get("/all", asyncWrapper(getAllUsers));
router.patch("/", asyncWrapper(updateUserProfile));
router.get("/:id", asyncWrapper(getUserById));
router.patch("/avatar", asyncWrapper(updateUserAvatar));

export const UserRouter: Router = router;
