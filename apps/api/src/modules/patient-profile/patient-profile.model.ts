import mongoose, { Schema, type Document, type Types } from 'mongoose'

/* =========================
   SUB SCHEMAS
========================= */

const MedicationSchema = new Schema(
  {
    name: { type: String, required: true },

    dose: String,

    frequency: String,
  },
  { _id: false },
)

const AllergySchema = new Schema(
  {
    allergen: { type: String, required: true },

    reaction: String,

    severity: {
      type: String,
      enum: ['mild', 'moderate', 'severe'],
    },
  },
  { _id: false },
)

/* =========================
   DOCUMENT TYPE
========================= */

export interface PatientProfileDocument extends Document {
  patientId: Types.ObjectId

  basicInfo?: {
    firstName?: string
    lastName?: string
    dateOfBirth?: Date
    sexAtBirth?: 'male' | 'female' | 'other'
    mobileNumber?: string
    email?: string
    address?: string
  }

  healthInfo?: {
    conditions?: string[]

    medications?: {
      name: string
      dose?: string
      frequency?: string
    }[]

    allergies?: {
      allergen: string
      reaction?: string
      severity?: 'mild' | 'moderate' | 'severe'
    }[]

    surgeries?: string[]

    familyHistory?: string[]
  }

  emergencyContact?: {
    name?: string
    relationship?: string
    phone?: string
  }

  consent?: {
    telehealthConsent?: boolean
    privacyAccepted?: boolean
    electronicSignature?: string
    submittedAt?: Date
  }

  metadata?: Record<string, any>

  createdAt: Date
  updatedAt: Date
}

/* =========================
   MAIN SCHEMA
========================= */

const PatientProfileSchema = new Schema<PatientProfileDocument>(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
      unique: true,
      index: true,
    },

    basicInfo: {
      firstName: String,

      lastName: String,

      dateOfBirth: Date,

      sexAtBirth: {
        type: String,
        enum: ['male', 'female', 'other'],
      },

      mobileNumber: String,

      email: String,

      address: String,
    },

    healthInfo: {
      conditions: {
        type: [String],
        default: [],
      },

      medications: {
        type: [MedicationSchema],
        default: [],
      },

      allergies: {
        type: [AllergySchema],
        default: [],
      },

      surgeries: {
        type: [String],
        default: [],
      },

      familyHistory: {
        type: [String],
        default: [],
      },
    },

    emergencyContact: {
      name: String,

      relationship: String,

      phone: String,
    },

    consent: {
      telehealthConsent: Boolean,

      privacyAccepted: Boolean,

      electronicSignature: String,

      submittedAt: Date,
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true },
)

/* =========================
   MODEL EXPORT
========================= */

const patientProfileModel =
  mongoose.models.PatientProfile as mongoose.Model<PatientProfileDocument> | undefined

export const PatientProfileModel =
  patientProfileModel ??
  mongoose.model<PatientProfileDocument>('PatientProfile', PatientProfileSchema)