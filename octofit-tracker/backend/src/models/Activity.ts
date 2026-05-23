import { Schema, model } from 'mongoose'

const ActivitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  distanceKm: { type: Number, default: 0 },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, default: 0 },
  date: { type: Date, required: true }
}, { timestamps: true })

export default model('Activity', ActivitySchema)
