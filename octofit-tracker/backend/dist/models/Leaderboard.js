"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LeaderboardSchema = new mongoose_1.Schema({
    rank: { type: Number, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    period: { type: String, default: 'weekly' }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Leaderboard', LeaderboardSchema);
