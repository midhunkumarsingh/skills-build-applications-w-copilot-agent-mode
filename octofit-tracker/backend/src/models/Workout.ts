import { Schema, model } from 'mongoose'

const WorkoutSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  durationMinutes: { type: Number, required: true },
  focusArea: { type: String, default: 'full body' },
  createdAt: { type: Date, default: Date.now }
})

export default model('Workout', WorkoutSchema)
