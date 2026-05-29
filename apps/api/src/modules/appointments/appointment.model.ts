import mongoose, { type Document } from 'mongoose'

export interface AppointmentDocument extends Document {
  patientName: string
  patientEmail: string

  doctorEmail: string
  doctorName: string

  startsAt: Date
  endsAt: Date

  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'

  calEventId?: string
  meetingLink?: string
  reason: string

  createdAt: Date
  updatedAt: Date
}

const appointmentSchema = new mongoose.Schema<AppointmentDocument>(
  {
    patientName: {
      type: String,
      required: true,
    },

    patientEmail: {
      type: String,
      required: true,
    },

    doctorEmail: {
      type: String,
      required: true,
      index: true,
    },

    doctorName: {
      type: String,
      required: true,
    },

    startsAt: {
      type: Date,
      required: true,
      index: true,
    },

    endsAt: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'confirmed',
    },

    calEventId: {
      type: String,
      unique: true,
      sparse: true,
    },

    meetingLink: {
      type: String,
    },

    reason: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
)

export const AppointmentModel =
  mongoose.models.Appointment ||
  mongoose.model<AppointmentDocument>(
    'Appointment',
    appointmentSchema,
  )