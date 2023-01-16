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
exports.updateUserProfile = exports.getUserById = exports.getAllUsers = void 0;
const User_model_1 = require("../models/User.model");
const firebase_1 = require("../utils/firebase");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listUsersResult = yield firebase_1.firebaseApp.auth().listUsers();
    return res.json(listUsersResult.users);
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userDB = yield User_model_1.User.findOne({ uid: id });
    if (!userDB) {
        const user = yield firebase_1.firebaseApp.auth().getUser(id);
        const createdDBUser = new User_model_1.User({
            uid: id,
            fullname: user.displayName,
        });
        const savedUser = yield createdDBUser.save();
        return res.json(savedUser);
    }
    console.log("User is already created");
    return res.json(userDB);
});
exports.getUserById = getUserById;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, fullname, occupation, bio } = req.body;
    yield User_model_1.User.findOneAndUpdate({ uid }, {
        fullname,
        occupation,
        bio,
    });
    return res.json({
        message: "User profile has successfully updated",
    });
});
exports.updateUserProfile = updateUserProfile;
