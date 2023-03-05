"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withController = void 0;
const withController = (path, method, controller, middlewares) => ({
    path,
    method,
    controller,
    middlewares: middlewares || [],
});
exports.withController = withController;
