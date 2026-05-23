"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const WorkoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    durationMinutes: { type: Number, required: true },
    focusArea: { type: String, default: 'full body' },
    createdAt: { type: Date, default: Date.now }
});
exports.default = (0, mongoose_1.model)('Workout', WorkoutSchema);
