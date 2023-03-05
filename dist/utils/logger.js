"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, printf } = winston_1.default.format;
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
};
const getLevelColor = (level) => {
    let color = "";
    if (level === "info") {
        color = "\x1b[32m"; // green
    }
    else if (level === "warn" || level === "verbose") {
        color = "\x1b[33m"; // yellow
    }
    else if (level === "error") {
        color = "\x1b[31m"; // red
    }
    else if (level === "http" || level === "debug" || level === "silly") {
        color = "\x1b[35m"; // magenta
    }
    else {
        color = "\x1b[37m"; // white
    }
    return color;
};
// Define log format
const logFormat = printf(({ level, message, timestamp: tsp }) => `${tsp} ${getLevelColor(level)}[${level.toUpperCase()}]${"\x1b[0m"}: ${message}`);
// Initialize logger
exports.logger = winston_1.default.createLogger({
    levels,
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
    transports: [
        new winston_1.default.transports.Console({
            level: "http",
        }),
        new winston_1.default.transports.Console({
            level: "error",
        }),
    ],
});
// Call exceptions.handle with a transport to handle exceptions
exports.logger.exceptions.handle(new winston_1.default.transports.Console());
exports.logger.exitOnError = false;
