"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const createNotification_route_1 = require("./routes/createNotification.route");
const deleteNotification_route_1 = require("./routes/deleteNotification.route");
const getAllNotifications_route_1 = require("./routes/getAllNotifications.route");
exports.controller = {
    getAllNotifications: getAllNotifications_route_1.getAllNotifications,
    createNotification: createNotification_route_1.createNotification,
    deleteNotification: deleteNotification_route_1.deleteNotification,
};
