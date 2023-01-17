"use strict";
// Description: Error handling middleware
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
    console.log(err);
    if (err.name === "MongoServerError" ||
        err.name === "ValidationError" ||
        err.name === "TypeError" ||
        err.name === "Error" ||
        err.name === "AppError") {
        return res.status((err === null || err === void 0 ? void 0 : err.code) || 400).send({ message: err.message });
    }
    return res.status(500).send({ message: "Server error" });
}
module.exports = {
    errorHandler,
};
