"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncWrapper_1 = require("../../helpers/asyncWrapper");
const feedback_controller_1 = require("./feedback.controller");
const router = express_1.default.Router();
// Notification routes
router.get("/all/", (0, asyncWrapper_1.asyncWrapper)(feedback_controller_1.controller.getAllFeedbacks));
router.get("/:userId", (0, asyncWrapper_1.asyncWrapper)(feedback_controller_1.controller.getAllUserFeedbacks));
router.post("/create", (0, asyncWrapper_1.asyncWrapper)(feedback_controller_1.controller.createFeedback));
router.delete("/delete", (0, asyncWrapper_1.asyncWrapper)(feedback_controller_1.controller.deleteFeedback));
exports.default = router;
