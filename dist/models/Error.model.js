"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError {
    constructor(message, code) {
        this.name = "AppError";
        this.message = message;
        this.code = code || 400;
    }
}
exports.AppError = AppError;
