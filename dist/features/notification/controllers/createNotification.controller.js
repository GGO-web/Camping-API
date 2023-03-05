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
exports.createNotification = void 0;
const notification_service_1 = require("../notification.service");
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = req.body;
    const createdNotification = yield notification_service_1.NotificationService.createNotification(notification);
    return res.status(200).json(createdNotification);
});
exports.createNotification = createNotification;
exports.default = {
    route: exports.createNotification,
    method: "post",
    path: "/create",
};
