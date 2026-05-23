"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
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
(0, database_1.default)();
const apiRouter = express_1.default.Router();
apiRouter.get('/users/', async (req, res) => {
    try {
        const users = await User_1.default.find().select('-passwordHash').lean();
        return res.json(users);
    }
    catch (error) {
        return res.status(500).json({ error: 'Unable to load users' });
    }
});
apiRouter.get('/teams/', async (req, res) => {
    try {
        const teams = await Team_1.default.find().populate('members', 'name email').lean();
        return res.json(teams);
    }
    catch (error) {
        return res.status(500).json({ error: 'Unable to load teams' });
    }
});
apiRouter.get('/activities/', async (req, res) => {
    try {
        const activities = await Activity_1.default.find()
            .populate('user', 'name email')
            .sort({ date: -1 })
            .lean();
        return res.json(activities);
    }
    catch (error) {
        return res.status(500).json({ error: 'Unable to load activities' });
    }
});
apiRouter.get('/leaderboard/', async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.default.find()
            .populate('user', 'name')
            .sort({ rank: 1 })
            .lean();
        return res.json(leaderboard);
    }
    catch (error) {
        return res.status(500).json({ error: 'Unable to load leaderboard' });
    }
});
apiRouter.get('/workouts/', async (req, res) => {
    try {
        const workouts = await Workout_1.default.find().lean();
        return res.json(workouts);
    }
    catch (error) {
        return res.status(500).json({ error: 'Unable to load workouts' });
    }
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
