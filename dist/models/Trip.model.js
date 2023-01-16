"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const mongoose_1 = require("mongoose");
const tripSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    tripName: { type: String, required: true },
    // locations is handled on frontend and different according to chosen API
    locations: { type: Array(), default: [], required: true },
    teammates: { type: Array(), default: [], required: true },
    tripPeriod: {
        type: {
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
            formatted: { type: String, required: true },
        },
        required: true,
    },
    bagItems: { type: Array(), default: [], required: true },
    // trip is completed when user add all items to bag or skip this step
    completed: { type: Boolean, default: false },
    // trip is activated when user post trip data request
    activated: { type: Boolean, default: false },
});
exports.Trip = (0, mongoose_1.model)("trips", tripSchema);
