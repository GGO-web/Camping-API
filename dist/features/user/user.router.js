"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const asyncWrapper_1 = require("../../helpers/asyncWrapper");
const router = express_1.default.Router();
// router.get("/all", asyncWrapper(controller.getAllUsers)); // only for development purposes
router.patch("/", (0, asyncWrapper_1.asyncWrapper)(user_controller_1.controller.updateUserProfile));
router.get("/:id", (0, asyncWrapper_1.asyncWrapper)(user_controller_1.controller.getUserById));
router.patch("/avatar", (0, asyncWrapper_1.asyncWrapper)(user_controller_1.controller.updateUserAvatar));
exports.default = router;
