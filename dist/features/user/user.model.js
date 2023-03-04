"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../constants");
const userSchema = new mongoose_1.Schema({
    uid: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: constants_1.defaultAvatarBASE64,
    },
    occupation: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
});
exports.User = (0, mongoose_1.model)("users", userSchema);
