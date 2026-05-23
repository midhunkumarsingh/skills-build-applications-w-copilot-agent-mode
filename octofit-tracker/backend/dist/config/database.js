"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        mongoose_1.default.set('strictQuery', true);
        await mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db');
        console.log('Connected to octofit_db');
    }
    catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};
exports.default = connectDB;
