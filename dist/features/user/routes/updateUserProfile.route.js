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
exports.updateUserProfile = void 0;
const user_service_1 = require("../user.service");
const notification_service_1 = require("../../notification/notification.service");
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, fullname, occupation, bio } = req.body;
    yield user_service_1.UserService.updateUserProfile({ uid, fullname, occupation, bio });
    yield notification_service_1.NotificationService.createNotification({
        userId: uid,
        title: "User profile",
        message: "Profile successfully updated check it out",
        type: "success",
    });
    return res.json({
        message: "User profile has successfully updated",
    });
});
exports.updateUserProfile = updateUserProfile;
exports.default = {
    route: exports.updateUserProfile,
    path: "/",
    method: "patch",
};
