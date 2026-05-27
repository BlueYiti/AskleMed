import mongoose, { Schema, type Document, type Model } from 'mongoose'

export type UserRole = 'patient' | 'doctor' | 'admin'

export interface UserDocument extends Document {
  authId: string

  email: string
  name: string

  role: UserRole

  avatar?: string

  isVerified: boolean
  isActive: boolean

  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<UserDocument>(
  {
    authId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ['patient', 'doctor', 'admin'],
      required: true,
      default: 'patient',
    },

    avatar: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export const UserModel: Model<UserDocument> =
  mongoose.models.User ||
  mongoose.model<UserDocument>('User', userSchema)