"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ActivitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    distanceKm: { type: Number, default: 0 },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, default: 0 },
    date: { type: Date, required: true }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Activity', ActivitySchema);
