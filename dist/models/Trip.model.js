"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const mongoose_1 = require("mongoose");
const tripSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    tripName: { type: String, required: true },
    // locations is handled on frontend and different according to chosen API
    locations: { type: Array(), default: [], required: true },
    teammates: {
        type: [String],
        default: [],
    },
    tripPeriod: {
        type: {
            startDate: { type: Date, required: true },
            endDate: { type: Date },
            formatted: { type: String, required: true },
        },
        required: true,
    },
    bagItems: {
        type: [
            {
                id: { type: String },
                description: { type: String, required: true },
                image: { type: String },
                count: { type: Number, default: 1, required: true },
                userId: { type: String, required: true },
            },
        ],
        default: [],
    },
    activities: {
        type: [
            {
                id: { type: String, default: Date.now() },
                heading: { type: String, required: true },
                description: { type: String, required: true },
                completed: { type: Boolean, default: false },
                userId: { type: String, required: true },
            },
        ],
        default: [],
    },
    // trip is completed when user add all items to bag or skip this step
    completed: { type: Boolean, default: false },
    // trip is activated when user post trip data request
    activated: { type: Boolean, default: false },
});
exports.Trip = (0, mongoose_1.model)("trips", tripSchema);
