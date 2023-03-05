"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const registerRoutes_1 = require("../../../helpers/registerRoutes");
const router = express_1.default.Router();
// register all routes
(0, registerRoutes_1.registerRoutes)(router, path_1.default.join(__dirname, "./routes"));
exports.default = router;
