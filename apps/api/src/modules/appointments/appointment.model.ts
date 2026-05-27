import mongoose, { type Document, type Types } from 'mongoose'

export interface AppointmentDocument extends Document {
  patient: Types.ObjectId
  doctor: Types.ObjectId
  reason: string
  startsAt: Date
  endsAt: Date
  status: 'confirmed' | 'cancelled' | 'pending'
  createdAt: Date
  updatedAt: Date
}

const appointmentSchema = new mongoose.Schema<AppointmentDocument>(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    reason: { type: String, required: true },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
    status: { type: String, enum: ['confirmed', 'cancelled', 'pending'], default: 'pending' },
  },
  { timestamps: true },
)

const appointmentModel = mongoose.models.Appointment as mongoose.Model<AppointmentDocument> | undefined
export const AppointmentModel = appointmentModel ?? mongoose.model<AppointmentDocument>('Appointment', appointmentSchema)
