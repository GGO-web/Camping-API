"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationRouter = void 0;
const express_1 = __importDefault(require("express"));
const LocationController_1 = require("../controllers/LocationController");
const asyncWrapper_1 = require("../helpers/asyncWrapper");
const router = express_1.default.Router();
router.get("/all", (0, asyncWrapper_1.asyncWrapper)(LocationController_1.getUserLocations));
router.post("/create", (0, asyncWrapper_1.asyncWrapper)(LocationController_1.createLocation));
exports.LocationRouter = router;
