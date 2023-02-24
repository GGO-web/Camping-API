"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("./notification.controller");
const asyncWrapper_1 = require("../../helpers/asyncWrapper");
const router = express_1.default.Router();
// Notification routes
router.get("/all/:userId", (0, asyncWrapper_1.asyncWrapper)(notification_controller_1.controller.getAllNotifications));
router.post("/create", (0, asyncWrapper_1.asyncWrapper)(notification_controller_1.controller.createNotification));
router.delete("/delete/:id", (0, asyncWrapper_1.asyncWrapper)(notification_controller_1.controller.deleteNotification));
exports.default = router;
