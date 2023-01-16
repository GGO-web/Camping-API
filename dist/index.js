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
const morgan_1 = __importDefault(require("morgan"));
// routers
const UserRouter_1 = require("./routers/UserRouter");
const TripRouter_1 = require("./routers/TripRouter");
// middlewares
const { errorHandler } = require("./middleware/errorMiddleware");
const { asyncWrapper } = require("./helpers/asyncWrapper");
// configs
require("dotenv").config();
require("./utils/mongoConnection");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.urlencoded({ extended: true }));
// using routers
app.use("/api/user", UserRouter_1.UserRouter);
app.use("/api/trip", TripRouter_1.TripRouter);
// listening server startup
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.listen(process.env.PORT || 9090, () => {
            console.log(`Server started on port: ${process.env.PORT || 9090}`);
        });
    }
    catch (err) {
        console.error(`Error on server startup: ${err.message}`);
    }
}))();
// ERROR HANDLER
app.use(errorHandler);
