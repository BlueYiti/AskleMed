import mongoose, { type Document, type Model, Schema } from 'mongoose'

export interface AppointmentDocument extends Document {
  patientId?: mongoose.Types.ObjectId | null

  patientName: string
  patientEmail: string

  doctorEmail: string
  doctorName: string

  startsAt: Date
  endsAt: Date

  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled' | 'rejected'

  calEventId?: string
  meetingLink?: string
  reason: string

  createdAt: Date
  updatedAt: Date
}

const appointmentSchema = new Schema<AppointmentDocument>(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      default: null,
    },

    patientName: { type: String, required: true },
    patientEmail: { type: String, required: true },

    doctorEmail: { type: String, required: true, index: true },
    doctorName: { type: String, required: true },

    startsAt: { type: Date, required: true, index: true },
    endsAt: { type: Date, required: true },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled', 'rejected'],
      default: 'confirmed',
    },

    calEventId: {
      type: String,
      unique: true,
      sparse: true,
    },

    meetingLink: { type: String },

    reason: { type: String, default: '' },
  },
  { timestamps: true }
)

// ✅ FIX: proper model typing (THIS prevents TS overload bugs)
export const AppointmentModel: Model<AppointmentDocument> =
  (mongoose.models.Appointment as Model<AppointmentDocument>) ||
  mongoose.model<AppointmentDocument>('Appointment', appointmentSchema)