import express, { Router } from "express";

import { getAllUsers, getUserById } from "../controllers/UserController";

import { asyncWrapper } from "../helpers/asyncWrapper";

const router: Router = express.Router();

router.get("/all", asyncWrapper(getAllUsers));
router.get("/:id", asyncWrapper(getUserById));

export const UserRouter: Router = router;
