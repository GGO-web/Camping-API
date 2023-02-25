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
exports.deleteActivity = void 0;
const activity_service_1 = require("../activity.service");
const deleteActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, activityId } = req.query;
    yield activity_service_1.ActivityService.deleteActivity(userId, activityId);
    return res.json({
        message: `Activity with id ${activityId} has been deleted successfully`,
    });
});
exports.deleteActivity = deleteActivity;
exports.default = {
    route: exports.deleteActivity,
    method: "delete",
    path: "/delete",
};
