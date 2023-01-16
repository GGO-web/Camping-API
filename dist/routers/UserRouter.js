"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const asyncWrapper_1 = require("../helpers/asyncWrapper");
const router = express_1.default.Router();
router.get("/all", (0, asyncWrapper_1.asyncWrapper)(UserController_1.getAllUsers));
router.patch("/", (0, asyncWrapper_1.asyncWrapper)(UserController_1.updateUserProfile));
router.get("/:id", (0, asyncWrapper_1.asyncWrapper)(UserController_1.getUserById));
router.patch("/avatar", (0, asyncWrapper_1.asyncWrapper)(UserController_1.updateUserAvatar));
exports.UserRouter = router;
