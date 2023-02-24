"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncWrapper_1 = require("../../helpers/asyncWrapper");
const feedback_controller_1 = __importDefault(require("./feedback.controller"));
const router = express_1.default.Router();
setTimeout(() => {
    // Notification routes
    feedback_controller_1.default.forEach((routeConfig) => {
        const method = routeConfig.method;
        switch (method) {
            case "get":
                router.get(routeConfig.path, (0, asyncWrapper_1.asyncWrapper)(routeConfig.route));
                break;
            case "post":
                router.post(routeConfig.path, (0, asyncWrapper_1.asyncWrapper)(routeConfig.route));
                break;
            case "put":
                router.put(routeConfig.path, (0, asyncWrapper_1.asyncWrapper)(routeConfig.route));
                break;
            case "delete":
                router.delete(routeConfig.path, (0, asyncWrapper_1.asyncWrapper)(routeConfig.route));
                break;
            case "patch":
                router.patch(routeConfig.path, (0, asyncWrapper_1.asyncWrapper)(routeConfig.route));
                break;
            default:
                break;
        }
    });
}, 0);
exports.default = router;
