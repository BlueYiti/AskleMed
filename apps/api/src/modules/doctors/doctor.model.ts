import mongoose, { type Document, type Types } from 'mongoose'

export interface DoctorDocument extends Document {
  name: string
  email: string
  specialty: string
  phone?: string
  createdAt: Date
  updatedAt: Date
}

const doctorSchema = new mongoose.Schema<DoctorDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    specialty: { type: String, required: true },
    phone: { type: String },
  },
  { timestamps: true },
)

const doctorModel = mongoose.models.Doctor as mongoose.Model<DoctorDocument> | undefined
export const DoctorModel = doctorModel ?? mongoose.model<DoctorDocument>('Doctor', doctorSchema)
