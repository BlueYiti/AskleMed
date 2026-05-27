import mongoose, { type Document, type Types } from 'mongoose'

/* =========================
   TYPES
========================= */

export interface Diagnosis {
  condition: string
  icd?: {
    system?: 'ICD-10' | 'ICD-11'
    code?: string
    description?: string
  }
  notes?: string
}

export interface Prescription {
  medicineName: string
  dosage?: {
    amount?: number
    unit?: 'mg' | 'g' | 'ml' | 'mcg' | 'tablet' | 'capsule' | 'drop' | 'puff' | 'IU'
  }
  route?:
    | 'oral'
    | 'iv'
    | 'im'
    | 'subcutaneous'
    | 'topical'
    | 'inhalation'
    | 'sublingual'
    | 'rectal'
  frequency: string
  duration?: string
  quantity?: number
  instructions?: string
  startDate?: Date
  endDate?: Date
  status?: 'active' | 'completed' | 'cancelled'
}

export interface Attachment {
  fileUrl: string
  fileType?: string
  uploadedAt?: Date
}

export interface Vitals {
  bloodPressure?: {
    systolic?: number
    diastolic?: number
  }

  heartRate?: number

  temperature?: {
    value?: number
    unit?: 'C' | 'F'
  }

  weight?: {
    value?: number
    unit?: 'kg' | 'lb'
  }

  height?: {
    value?: number
    unit?: 'cm' | 'ft'
  }

  oxygenSaturation?: number

  recordedAt?: Date
}

/* =========================
   MAIN DOCUMENT
========================= */

export interface MedicalRecordDocument extends Document {
  patient: Types.ObjectId
  doctor: Types.ObjectId

  diagnoses?: Diagnosis[]
  prescriptions?: Prescription[]
  attachments?: Attachment[]
  vitals?: Vitals

  notes: string
  followUpDate?: Date

  createdAt: Date
  updatedAt: Date
}

/* =========================
   SCHEMAS
========================= */

const DiagnosisSchema = new mongoose.Schema<Diagnosis>({
  condition: { type: String, required: true },

  icd: {
    system: { type: String, enum: ['ICD-10', 'ICD-11'], default: 'ICD-10' },
    code: String,
    description: String,
  },

  notes: String,
})

const PrescriptionSchema = new mongoose.Schema<Prescription>({
  medicineName: { type: String, required: true },

  dosage: {
    amount: { type: Number, min: 0 },
    unit: {
      type: String,
      enum: ['mg', 'g', 'ml', 'mcg', 'tablet', 'capsule', 'drop', 'puff', 'IU'],
    },
  },

  route: {
    type: String,
    enum: [
      'oral',
      'iv',
      'im',
      'subcutaneous',
      'topical',
      'inhalation',
      'sublingual',
      'rectal',
    ],
  },

  frequency: { type: String, required: true },
  duration: String,
  quantity: { type: Number, min: 0 },
  instructions: String,

  startDate: { type: Date, default: Date.now },
  endDate: Date,

  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active',
  },
})

const AttachmentSchema = new mongoose.Schema<Attachment>({
  fileUrl: { type: String, required: true },
  fileType: String,
  uploadedAt: { type: Date, default: Date.now },
})

const VitalsSchema = new mongoose.Schema<Vitals>({
  bloodPressure: {
    systolic: { type: Number, min: 50, max: 250 },
    diastolic: { type: Number, min: 30, max: 150 },
  },

  heartRate: { type: Number, min: 20, max: 250 },

  temperature: {
    value: { type: Number, min: 25, max: 45 },
    unit: { type: String, enum: ['C', 'F'], default: 'C' },
  },

  weight: {
    value: { type: Number, min: 0 },
    unit: { type: String, enum: ['kg', 'lb'], default: 'kg' },
  },

  height: {
    value: { type: Number, min: 0 },
    unit: { type: String, enum: ['cm', 'ft'], default: 'cm' },
  },

  oxygenSaturation: { type: Number, min: 0, max: 100 },

  recordedAt: { type: Date, default: Date.now },
})

/* =========================
   MEDICAL RECORD SCHEMA
========================= */

const medicalRecordSchema = new mongoose.Schema<MedicalRecordDocument>(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
      index: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
      index: true,
    },

    diagnoses: [DiagnosisSchema],
    prescriptions: [PrescriptionSchema],
    attachments: [AttachmentSchema],
    vitals: VitalsSchema,

    notes: { type: String, required: true },

    followUpDate: Date,
  },
  { timestamps: true },
)

/* =========================
   MODEL EXPORT
========================= */

const medicalRecordModel =
  mongoose.models.MedicalRecord as mongoose.Model<MedicalRecordDocument> | undefined

export const MedicalRecordModel =
  medicalRecordModel ?? mongoose.model<MedicalRecordDocument>('MedicalRecord', medicalRecordSchema)