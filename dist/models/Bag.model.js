"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bag = void 0;
const mongoose_1 = require("mongoose");
const bagSchema = new mongoose_1.Schema({
    // _id field is predefined by mongoose
    desciption: { type: String, required: true },
    image: { type: String },
    userId: { type: String, required: true },
});
exports.Bag = (0, mongoose_1.model)("bag", bagSchema);
