"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const uuid_1 = require("uuid");
const Error_model_1 = require("../../models/Error.model");
const notification_model_1 = require("./notification.model");
class NotificationService {
}
exports.NotificationService = NotificationService;
_a = NotificationService;
NotificationService.getNotificationById = (id) => {
    const notification = notification_model_1.Notification.findOne({ id });
    if (!notification) {
        throw new Error_model_1.AppError("Notification has not been found");
    }
    return notification;
};
NotificationService.getAllNotifications = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const notifications = yield notification_model_1.Notification.find({ userId }, "-__v");
    return notifications;
});
NotificationService.createNotification = (notification) => __awaiter(void 0, void 0, void 0, function* () {
    const createdNotification = yield notification_model_1.Notification.create(Object.assign(Object.assign({}, notification), { id: (0, uuid_1.v4)() }));
    return createdNotification;
});
NotificationService.deleteNotification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield _a.getNotificationById(id);
    if (!notification) {
        throw new Error_model_1.AppError("Notification has been already deleted", 404);
    }
    yield (notification === null || notification === void 0 ? void 0 : notification.delete());
});
