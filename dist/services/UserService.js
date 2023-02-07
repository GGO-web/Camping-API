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
exports.UserService = void 0;
const User_model_1 = require("../models/User.model");
const firebase_1 = require("../utils/firebase");
const NotificationService_1 = require("./NotificationService");
class UserService {
    static getUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDB = yield User_model_1.User.findOne({ uid: uid });
            return userDB;
        });
    }
    static createUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDB = yield this.getUser(uid);
            if (!userDB) {
                const user = yield firebase_1.firebaseApp.auth().getUser(uid);
                const createdDBUser = new User_model_1.User({
                    uid,
                    fullname: user.displayName,
                });
                NotificationService_1.NotificationService.createNotification({
                    userId: uid,
                    title: "Congratulations!",
                    message: "You recieved the welcome badge",
                    type: "badge",
                });
                const savedUser = yield createdDBUser.save();
                return savedUser;
            }
            else {
                console.log("User is already created");
                return userDB;
            }
        });
    }
    static updateUserProfile(userProfile) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUser(userProfile.uid);
            if (!user) {
                throw new Error("User is not found");
            }
            user.set(Object.assign({}, userProfile));
            yield user.save();
        });
    }
}
exports.UserService = UserService;
