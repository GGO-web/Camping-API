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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotification = exports.createNotification = exports.getAllNotifications = void 0;
const NotificationService_1 = require("../services/NotificationService");
const getAllNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const notifications = yield NotificationService_1.NotificationService.getAllNotifications(userId);
    return res.status(200).json(notifications);
});
exports.getAllNotifications = getAllNotifications;
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = req.body;
    const createdNotification = yield NotificationService_1.NotificationService.createNotification(notification);
    return res.status(200).json(createdNotification);
});
exports.createNotification = createNotification;
const deleteNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield NotificationService_1.NotificationService.deleteNotification(id);
    return res.status(200).json({
        message: "Notification has been deleted successfully"
    });
});
exports.deleteNotification = deleteNotification;
