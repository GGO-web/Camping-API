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
const asyncWrapper_1 = require("../../../helpers/asyncWrapper");
const withController_1 = require("../../../helpers/withController");
const feedback_service_1 = require("../feedback.service");
const getAllUserFeedbacks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const userFeedbacks = yield feedback_service_1.FeedbackService.getAllUserFeedbacks(userId);
    return res.status(200).json(userFeedbacks);
});
exports.default = [
    (0, withController_1.withController)("/:userId", "get", (0, asyncWrapper_1.asyncWrapper)(getAllUserFeedbacks))
];
