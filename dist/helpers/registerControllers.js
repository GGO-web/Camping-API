"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.registerControllers = void 0;
const logger_1 = require("../utils/logger");
const getDirectoryFiles_1 = require("./getDirectoryFiles");
const registerControllers = (router, path) => {
    (0, getDirectoryFiles_1.getDirectoryFiles)(path).map((routeName) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const controller = yield (_a = `${path}/${routeName}`, Promise.resolve().then(() => __importStar(require(_a))));
        const controllerConfigs = controller.default;
        controllerConfigs.map((controllerConfig) => {
            const { method, middlewares } = controllerConfig;
            if (controllerConfig.controller) {
                router[method](controllerConfig.path, ...(middlewares || []), controllerConfig.controller);
                // logger.info(
                //   `ROUTE ${"\x1b[33m"}${
                //     controllerConfig.path
                //   }${"\x1b[0m"} registered with method ${"\x1b[33m"}${routeName.replace(
                //     ".route.js",
                //     ""
                //   )}${"\x1b[0m"}`
                // );
            }
            else {
                logger_1.logger.error(`Route ${controllerConfig.path} is not defined in ${routeName} file`);
            }
        });
    }));
};
exports.registerControllers = registerControllers;
