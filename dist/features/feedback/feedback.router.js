"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const registerControllers_1 = require("../../helpers/registerControllers");
const router = express_1.default.Router();
// register all routes
(0, registerControllers_1.registerControllers)(router, path_1.default.join(__dirname, "./controllers"));
exports.default = router;
