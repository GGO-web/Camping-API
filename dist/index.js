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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const getDirectoryStructure_1 = require("./helpers/getDirectoryStructure");
const morganMiddleware_1 = require("./middleware/morganMiddleware");
// middlewares
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const logger_1 = require("./utils/logger");
// configs
require("./utils/config");
const app = (0, express_1.default)();
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(morganMiddleware_1.morganMiddleware);
app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../openapi.json");
// swagger api documentation route: http://localhost:8080/api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// register all features routers
(0, getDirectoryStructure_1.getDirectories)("./src/features").map((feature) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    logger_1.logger.log({ level: "info", message: `Registering router: ${feature}` });
    const router = yield (_a = `./features/${feature}/${feature}.router`, Promise.resolve().then(() => __importStar(require(_a))));
    app.use(`/api/${feature}`, router.default);
}));
// listening server startup
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const port = process.env.PORT || 9090;
        app.listen(port, () => {
            logger_1.logger.info({ message: `Listening on port ${port}`, port });
        });
    }
    catch (err) {
        logger_1.logger.error(`Error on server startup: ${err.message}`);
    }
}))();
// ERROR HANDLER
app.use(errorMiddleware_1.errorHandler);
