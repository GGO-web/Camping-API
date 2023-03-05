"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseApp = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
exports.firebaseApp = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(require("../../private/camping-app-66565-firebase-adminsdk-y5t5h-cff9822bb7.json")),
});
