"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./models/User"));
const Team_1 = __importDefault(require("./models/Team"));
const Activity_1 = __importDefault(require("./models/Activity"));
const Leaderboard_1 = __importDefault(require("./models/Leaderboard"));
const Workout_1 = __importDefault(require("./models/Workout"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_BASE_URL = CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';
mongoose_1.default.set('strictQuery', true);
mongoose_1.default.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
const apiRouter = express_1.default.Router();
apiRouter.get('/users', async (req, res) => {
    const users = await User_1.default.find().select('-passwordHash').lean();
    res.json(users);
});
apiRouter.get('/teams', async (req, res) => {
    const teams = await Team_1.default.find().populate('members', 'name email').lean();
    res.json(teams);
});
apiRouter.get('/activities', async (req, res) => {
    const activities = await Activity_1.default.find()
        .populate('user', 'name email')
        .sort({ date: -1 })
        .lean();
    res.json(activities);
});
apiRouter.get('/leaderboard', async (req, res) => {
    const leaderboard = await Leaderboard_1.default.find()
        .populate('user', 'name')
        .sort({ rank: 1 })
        .lean();
    res.json(leaderboard);
});
apiRouter.get('/workouts', async (req, res) => {
    const workouts = await Workout_1.default.find().lean();
    res.json(workouts);
});
apiRouter.get('/config', (req, res) => {
    res.json({ apiBaseUrl: API_BASE_URL });
});
app.use('/api', apiRouter);
app.get('/', (req, res) => {
    res.json({ message: 'OctoFit Tracker API', apiBaseUrl: API_BASE_URL });
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`API base URL: ${API_BASE_URL}`);
});
