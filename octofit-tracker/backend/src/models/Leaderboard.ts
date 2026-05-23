import { Schema, model } from 'mongoose'

const LeaderboardSchema = new Schema({
  rank: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  period: { type: String, default: 'weekly' }
}, { timestamps: true })

export default model('Leaderboard', LeaderboardSchema)
