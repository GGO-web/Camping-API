"use strict";
// Description: Error handling middleware
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
    console.log(err.name);
    if (err.name === "MongoServerError" ||
        err.name === "ValidationError" ||
        err.name === "TypeError" ||
        err.name === "Error") {
        return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({ message: "Server error" });
}
module.exports = {
    errorHandler
};
