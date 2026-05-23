/**
 * Seed the octofit_db database with test data.
 */
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User'
import Team from '../models/Team'
import Activity from '../models/Activity'
import Leaderboard from '../models/Leaderboard'
import Workout from '../models/Workout'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db'

const seed = async () => {
  console.log('Seed the octofit_db database with test data')
  await mongoose.connect(MONGO_URI)

  const db = mongoose.connection
  try {
    await db.dropDatabase()
    console.log('Dropped existing octofit_db database')

    const users = await User.create([
      { name: 'Avery Brooks', email: 'avery.brooks@example.com', passwordHash: 'hashed-password-1' },
      { name: 'Jordan Lee', email: 'jordan.lee@example.com', passwordHash: 'hashed-password-2' },
      { name: 'Mina Patel', email: 'mina.patel@example.com', passwordHash: 'hashed-password-3' }
    ])

    const teams = await Team.create([
      {
        name: 'Octo Sprinters',
        description: 'Fast-paced runners hitting daily goals',
        members: [users[0]._id, users[1]._id]
      },
      {
        name: 'Wellness Wave',
        description: 'Balanced training with strength and recovery',
        members: [users[1]._id, users[2]._id]
      }
    ])

    const workouts = await Workout.create([
      {
        title: 'Morning HIIT Blast',
        description: 'A high-energy 30-minute interval workout to kick start your day.',
        difficulty: 'hard',
        durationMinutes: 30,
        focusArea: 'cardio'
      },
      {
        title: 'Core Strength Builder',
        description: 'Focused core and mobility routine for stability.',
        difficulty: 'medium',
        durationMinutes: 25,
        focusArea: 'core'
      },
      {
        title: 'Recovery Stretch Session',
        description: 'Gentle full-body stretches to recover after a tough week.',
        difficulty: 'easy',
        durationMinutes: 20,
        focusArea: 'recovery'
      }
    ])

    const activities = await Activity.create([
      {
        user: users[0]._id,
        type: 'run',
        distanceKm: 6.2,
        durationMinutes: 35,
        caloriesBurned: 410,
        date: new Date('2026-05-20T07:30:00Z')
      },
      {
        user: users[1]._id,
        type: 'spin',
        distanceKm: 18,
        durationMinutes: 50,
        caloriesBurned: 560,
        date: new Date('2026-05-21T17:00:00Z')
      },
      {
        user: users[2]._id,
        type: 'yoga',
        durationMinutes: 40,
        caloriesBurned: 190,
        date: new Date('2026-05-22T09:00:00Z')
      }
    ])

    const leaderboard = await Leaderboard.create([
      { rank: 1, user: users[1]._id, score: 1420, period: 'weekly' },
      { rank: 2, user: users[0]._id, score: 1360, period: 'weekly' },
      { rank: 3, user: users[2]._id, score: 1230, period: 'weekly' }
    ])

    console.log(`Inserted ${users.length} users`)
    console.log(`Inserted ${teams.length} teams`)
    console.log(`Inserted ${workouts.length} workouts`)
    console.log(`Inserted ${activities.length} activities`)
    console.log(`Inserted ${leaderboard.length} leaderboard entries`)
    console.log('Seed complete')
  } catch (error) {
    console.error('Seed failed:', error)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
  }
}

seed().catch(err => {
  console.error('Seed script terminated with error:', err)
  process.exit(1)
})
