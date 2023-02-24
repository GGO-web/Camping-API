"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston = __importStar(require("winston"));
const { combine, timestamp, printf } = winston.format;
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
};
const getLevelColor = (level) => {
    let color = '';
    if (level === 'info') {
        color = '\x1b[32m'; // green
    }
    else if (level === 'warn') {
        color = '\x1b[33m'; // yellow
    }
    else if (level === 'error') {
        color = '\x1b[31m'; // red
    }
    else if (level === 'http') {
        color = '\x1b[35m'; // green
    }
    else {
        color = '\x1b[37m'; // white
    }
    return color;
};
// Define log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${getLevelColor(level)}[${level.toUpperCase()}]${'\x1b[0m'}: ${message}`;
});
// Initialize logger
exports.logger = winston.createLogger({
    levels: levels,
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    transports: [
        new winston.transports.Console({
            level: 'http',
        }),
        new winston.transports.Console({
            level: 'error',
        }),
    ]
});
// Call exceptions.handle with a transport to handle exceptions
exports.logger.exceptions.handle(new winston.transports.Console());
exports.logger.exitOnError = false;
