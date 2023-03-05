"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("./logger");
mongoose_1.default.set("strictQuery", false);
mongoose_1.default.connect(process.env.MONGODB_CONNECTION, () => {
    logger_1.logger.info("MongoDB successfully connected");
});
