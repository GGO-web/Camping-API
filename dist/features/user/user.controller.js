"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const getAllUsers_route_1 = require("./routes/getAllUsers.route");
const getUserById_route_1 = require("./routes/getUserById.route");
const updateUserProfile_route_1 = require("./routes/updateUserProfile.route");
const updateUserAvatar_route_1 = require("./routes/updateUserAvatar.route");
exports.controller = {
    getAllUsers: getAllUsers_route_1.getAllUsers,
    getUserById: getUserById_route_1.getUserById,
    updateUserProfile: updateUserProfile_route_1.updateUserProfile,
    updateUserAvatar: updateUserAvatar_route_1.updateUserAvatar,
};
