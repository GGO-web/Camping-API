import express, { Router } from "express";

import path from "path";

import { registerControllers } from "../../helpers/registerControllers";

const router: Router = express.Router();

// register all routes
registerControllers(router, path.join(__dirname, "./controllers"));

export default router;
