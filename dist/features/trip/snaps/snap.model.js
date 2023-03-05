"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snap = void 0;
const mongoose_1 = require("mongoose");
const snapSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    image: { type: String, required: true },
});
exports.Snap = (0, mongoose_1.model)("Snap", snapSchema);
