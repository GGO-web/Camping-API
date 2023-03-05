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
exports.asyncWrapper = void 0;
const Error_model_1 = require("../models/Error.model");
// middleware to handle async/await errors
const asyncWrapper = (controller) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller(req, res, next);
    }
    catch (e) {
        if (e instanceof Error_model_1.AppError) {
            return res.status(e.code || 400).json({ message: e.message });
        }
        const error = e;
        return res.status(400).json({ message: error.message });
    }
});
exports.asyncWrapper = asyncWrapper;
