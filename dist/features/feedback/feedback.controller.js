"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const getAllFeedbacks_route_1 = require("./routes/getAllFeedbacks.route");
const getAllUserFeedbacks_route_1 = require("./routes/getAllUserFeedbacks.route");
const createFeedback_route_1 = require("./routes/createFeedback.route");
const deleteFeedback_route_1 = require("./routes/deleteFeedback.route");
exports.controller = {
    getAllFeedbacks: getAllFeedbacks_route_1.getAllFeedbacks,
    getAllUserFeedbacks: getAllUserFeedbacks_route_1.getAllUserFeedbacks,
    createFeedback: createFeedback_route_1.createFeedback,
    deleteFeedback: deleteFeedback_route_1.deleteFeedback,
};
