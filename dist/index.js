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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morganMiddleware_1 = require("./middleware/morganMiddleware");
// middlewares
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const logger_1 = require("./utils/logger");
// configs
require("./utils/config");
const registerRouters_1 = require("./helpers/registerRouters");
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
(0, registerRouters_1.registerRouters)(app);
// listening server startup
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const port = process.env.PORT || 9090;
        app.listen(port, () => {
            logger_1.logger.info({ message: `Listening on port ${port}`, port });
        });
    }
    catch (err) {
        const error = err;
        logger_1.logger.error(`Error on server startup: ${error.message}`);
    }
}))();
// ERROR HANDLER
app.use(errorMiddleware_1.errorHandler);
