"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWrapper = void 0;
// middleware to handle async/await errors
const asyncWrapper = (controller) => (req, res, next) => controller(req, res, next).catch(next);
exports.asyncWrapper = asyncWrapper;
