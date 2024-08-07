import mongoose, { Schema, InferSchemaType, Document } from 'mongoose'

type SessionType = InferSchemaType<typeof session_schema>

export interface ISession extends SessionType, Document {}

const session_schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
    },
    ip: { type: String, required: true, },
    user_agent: { type: String, required: true, },
    valid: { type: Boolean, required: true, },
  }, 
  {
    timestamps: true
  }
)

const SessionModel = mongoose.model<ISession>('Session', session_schema)

export default SessionModel
