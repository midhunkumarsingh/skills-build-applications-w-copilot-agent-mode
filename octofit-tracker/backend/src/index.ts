import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User'
import Team from './models/Team'
import Activity from './models/Activity'
import Leaderboard from './models/Leaderboard'
import Workout from './models/Workout'

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000
const CODESPACE_NAME = process.env.CODESPACE_NAME
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db'

mongoose.set('strictQuery', true)
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

const apiRouter = express.Router()

apiRouter.get('/users', async (req, res) => {
  const users = await User.find().select('-passwordHash').lean()
  res.json(users)
})

apiRouter.get('/teams', async (req, res) => {
  const teams = await Team.find().populate('members', 'name email').lean()
  res.json(teams)
})

apiRouter.get('/activities', async (req, res) => {
  const activities = await Activity.find()
    .populate('user', 'name email')
    .sort({ date: -1 })
    .lean()
  res.json(activities)
})

apiRouter.get('/leaderboard', async (req, res) => {
  const leaderboard = await Leaderboard.find()
    .populate('user', 'name')
    .sort({ rank: 1 })
    .lean()
  res.json(leaderboard)
})

apiRouter.get('/workouts', async (req, res) => {
  const workouts = await Workout.find().lean()
  res.json(workouts)
})

apiRouter.get('/config', (req, res) => {
  res.json({ apiBaseUrl: API_BASE_URL })
})

app.use('/api', apiRouter)

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker API', apiBaseUrl: API_BASE_URL })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
  console.log(`API base URL: ${API_BASE_URL}`)
})
