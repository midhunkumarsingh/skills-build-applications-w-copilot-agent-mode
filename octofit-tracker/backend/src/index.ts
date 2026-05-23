import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/database'
import User from './models/User'
import Team from './models/Team'
import Activity from './models/Activity'
import Leaderboard from './models/Leaderboard'
import Workout from './models/Workout'

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000
const HOST = '0.0.0.0'
const CODESPACE_NAME = process.env.CODESPACE_NAME
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`

connectDB()

const apiRouter = express.Router()

apiRouter.get('/users/', async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash').lean()
    return res.json(users)
  } catch (error) {
    return res.status(500).json({ error: 'Unable to load users' })
  }
})

apiRouter.get('/teams/', async (req, res) => {
  try {
    const teams = await Team.find().populate('members', 'name email').lean()
    return res.json(teams)
  } catch (error) {
    return res.status(500).json({ error: 'Unable to load teams' })
  }
})

apiRouter.get('/activities/', async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'name email')
      .sort({ date: -1 })
      .lean()
    return res.json(activities)
  } catch (error) {
    return res.status(500).json({ error: 'Unable to load activities' })
  }
})

apiRouter.get('/leaderboard/', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('user', 'name')
      .sort({ rank: 1 })
      .lean()
    return res.json(leaderboard)
  } catch (error) {
    return res.status(500).json({ error: 'Unable to load leaderboard' })
  }
})

apiRouter.get('/workouts/', async (req, res) => {
  try {
    const workouts = await Workout.find().lean()
    return res.json(workouts)
  } catch (error) {
    return res.status(500).json({ error: 'Unable to load workouts' })
  }
})

apiRouter.get('/config', (req, res) => {
  res.json({ apiBaseUrl: API_BASE_URL })
})

app.use('/api', apiRouter)

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker API', apiBaseUrl: API_BASE_URL })
})

app.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}`)
  console.log(`API base URL: ${API_BASE_URL}`)
})
