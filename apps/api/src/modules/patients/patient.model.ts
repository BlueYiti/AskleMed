import mongoose, { type Document } from 'mongoose'

export interface PatientDocument extends Document {
  authId: string
  name: string
  email: string
  phone?: string
  dateOfBirth?: Date
  address?: string
  sex?: 'male' | 'female' | 'other'
  emergencyContact?: {
    name?: string
    relationship?: string
    phone?: string
  }
  createdAt: Date
  updatedAt: Date
}

const patientSchema = new mongoose.Schema<PatientDocument>(
  {
    authId: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String },
    dateOfBirth: { type: Date },
    address: { type: String },
    sex: { type: String, enum: ['male', 'female', 'other'] },
    emergencyContact: {
      name: { type: String },
      relationship: { type: String },
      phone: { type: String },
    },
  },
  { timestamps: true },
)

const patientModel = mongoose.models.Patient as mongoose.Model<PatientDocument> | undefined
export const PatientModel = patientModel ?? mongoose.model<PatientDocument>('Patient', patientSchema)
