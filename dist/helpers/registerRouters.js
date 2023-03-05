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
exports.registerRouters = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const logger_1 = require("../utils/logger");
const getDirectoryStructure_1 = require("./getDirectoryStructure");
const path = (0, path_1.resolve)(__dirname, "../features");
const registerRouters = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const getControllerFromPath = (currentPath, baseFolderName = "index") => {
        const pathParts = currentPath.split("/");
        let featurePath = "";
        if (currentPath.includes(baseFolderName)) {
            pathParts.splice(pathParts.length - 2, 1);
            featurePath = pathParts.join("/");
        }
        else {
            featurePath = currentPath;
        }
        /*
          get the router name from path, for example: /trip/ROUTER_NAME/index => ROUTER_NAME
          if the router name is not found, use name "index.router.ts" as default
         */
        const feature = pathParts.at(-2) || "index";
        return { feature, featurePath };
    };
    const resolveRouter = (currentPath) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const fullPath = (0, path_1.join)(path, currentPath);
        const isControllerFolder = (0, fs_1.readdirSync)(fullPath, {
            withFileTypes: true,
        }).some((dirent) => dirent.isFile());
        if (!isControllerFolder) {
            (0, getDirectoryStructure_1.getDirectories)(fullPath).map((feature) => __awaiter(void 0, void 0, void 0, function* () {
                resolveRouter((0, path_1.join)(currentPath, `${feature}/`));
            }));
        }
        else {
            const { feature, featurePath } = getControllerFromPath(currentPath);
            const router = yield (_a = (0, path_1.join)(fullPath, `${feature}.router`), Promise.resolve().then(() => __importStar(require(_a))));
            const routerPath = `/api${featurePath}`;
            logger_1.logger.log({
                level: "info",
                message: `Registering router at path: ${routerPath}`,
            });
            app.use(routerPath, router.default);
        }
    });
    resolveRouter("/");
});
exports.registerRouters = registerRouters;
