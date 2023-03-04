"use strict";
// Description: Error handling middleware
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../utils/logger");
function errorHandler(err, req, res, _next) {
    if (err.name === "MongoServerError" ||
        err.name === "ValidationError" ||
        err.name === "TypeError" ||
        err.name === "Error" ||
        err.name === "AppError") {
        logger_1.logger.error(err.message);
        return res.status((err === null || err === void 0 ? void 0 : err.code) || 400).send({ message: err.message });
    }
    logger_1.logger.error("Server error");
    return res.status(500).send({ message: "Server error" });
}
exports.errorHandler = errorHandler;
