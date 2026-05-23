import { Schema, model } from 'mongoose'

const TeamSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
})

export default model('Team', TeamSchema)
