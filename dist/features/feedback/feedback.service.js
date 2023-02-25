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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
const Error_model_1 = require("../../models/Error.model");
const feedback_model_1 = require("./feedback.model");
const user_service_1 = require("../user/user.service");
class FeedbackService {
}
exports.FeedbackService = FeedbackService;
_a = FeedbackService;
FeedbackService.getAllFeedbacks = () => __awaiter(void 0, void 0, void 0, function* () {
    const feedbacks = yield feedback_model_1.Feedback.find();
    return feedbacks;
});
FeedbackService.getAllUserFeedbacks = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserService.getUser(userId);
    if (!user) {
        throw new Error_model_1.AppError("User is not found", 404);
    }
    const userFeedbacks = yield feedback_model_1.Feedback.find({ userId });
    return userFeedbacks;
});
FeedbackService.createFeedback = (userId, message) => __awaiter(void 0, void 0, void 0, function* () {
    const feedback = yield feedback_model_1.Feedback.create({
        userId,
        message,
    });
    return feedback;
});
FeedbackService.deleteFeedback = (userId, feedbackId) => __awaiter(void 0, void 0, void 0, function* () {
    const feedback = yield feedback_model_1.Feedback.findOneAndDelete({
        _id: feedbackId,
        userId,
    });
    if (!feedback) {
        throw new Error("Feedback is not found or has been already deleted");
    }
    return feedback;
});
