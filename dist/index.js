"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
// routers
// middlewares
const { errorHandler } = require("./middleware/errorMiddleware");
// const { asyncWrapper } = require("./helpers/asyncWrapper");
require("dotenv").config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.urlencoded({ extended: true }));
// using routers
// listening server startup
(async () => {
    try {
        app.listen(process.env.PORT || 9090);
    }
    catch (err) {
        console.error(`Error on server startup: ${err.message}`);
    }
})();
// ERROR HANDLER
app.use(errorHandler);
