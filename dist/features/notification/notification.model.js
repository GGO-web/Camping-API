"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = exports.ENotificationTypes = void 0;
const mongoose_1 = require("mongoose");
var ENotificationTypes;
(function (ENotificationTypes) {
    ENotificationTypes["badge"] = "badge";
    ENotificationTypes["info"] = "info";
    ENotificationTypes["success"] = "success";
    ENotificationTypes["invitation"] = "invitation";
})(ENotificationTypes = exports.ENotificationTypes || (exports.ENotificationTypes = {}));
const notificationSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: Object.values(ENotificationTypes),
        required: true,
    },
    datetime: {
        type: Date,
        default: new Date().toISOString(),
    },
});
exports.Notification = (0, mongoose_1.model)("Notifications", notificationSchema);
