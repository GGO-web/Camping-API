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
exports.getAllUsers = void 0;
const firebase_1 = require("../../../utils/firebase");
const getAllUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listUsersResult = yield firebase_1.firebaseApp.auth().listUsers();
    return res.json(listUsersResult.users);
});
exports.getAllUsers = getAllUsers;
exports.default = {
    route: exports.getAllUsers,
    middlewares: [
        // add middlewares here
        (req, res, next) => {
            const { key } = req.query;
            if (key === process.env.FIREBASE_ACCESS_KEY) {
                next();
            }
            else {
                res.status(401).json({ message: "Unauthorized" });
            }
        },
    ],
    path: "/all",
    method: "get",
};
