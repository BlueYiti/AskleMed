import mongoose, { type Document } from 'mongoose'

export interface PatientDocument extends Document {
  name: string
  email: string
  phone?: string
  dateOfBirth?: Date
  createdAt: Date
  updatedAt: Date
}

const patientSchema = new mongoose.Schema<PatientDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String },
    dateOfBirth: { type: Date },
  },
  { timestamps: true },
)

const patientModel = mongoose.models.Patient as mongoose.Model<PatientDocument> | undefined
export const PatientModel = patientModel ?? mongoose.model<PatientDocument>('Patient', patientSchema)
