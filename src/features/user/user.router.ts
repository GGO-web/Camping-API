import express, { Router } from "express";

import path from "path";

import { registerRoutes } from "../../helpers/registerRoutes";

const router: Router = express.Router();

// register all routes
registerRoutes(router, path.join(__dirname, "./routes"));

export default router;
