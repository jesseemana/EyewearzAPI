import mongoose, { Schema, InferSchemaType } from 'mongoose'

export type SessionType = InferSchemaType<typeof session_schema>

const session_schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
    },
    ip: { type: String, required: true, },
    user_agent: { type: String, required: true, },
    valid: { type: Boolean, required: true, },
  }, 
  {
    timestamps: true
  }
)

const SessionModel = mongoose.model('Session', session_schema)

export default SessionModel
