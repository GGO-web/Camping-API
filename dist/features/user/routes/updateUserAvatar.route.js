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
exports.updateUserAvatar = void 0;
const isValidImageFormat_1 = require("../../../helpers/isValidImageFormat");
const NotificationService_1 = require("../../../services/NotificationService");
const UserService_1 = require("../../../services/UserService");
const updateUserAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, avatar } = req.body;
    if (!(0, isValidImageFormat_1.isValidImageFormat)(avatar)) {
        return res.status(400).json({
            message: "Avatar format is not allowed or incorrect. Use base64 instead",
        });
    }
    yield UserService_1.UserService.updateUserProfile({ uid, avatar });
    yield NotificationService_1.NotificationService.createNotification({
        userId: uid,
        title: "User profile",
        message: "Avatar has been changed and your teammates will see it very soon",
        type: "success",
    });
    return res.json({
        message: "User avatar was changed",
    });
});
exports.updateUserAvatar = updateUserAvatar;
