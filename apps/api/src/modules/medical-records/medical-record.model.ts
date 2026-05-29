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
    unit?: 'mg' | 'g' | 'ml' | 'mcg' | 'tablet' | 'capsule'
  }

  frequency: string

  duration?: string

  instructions?: string

  status?: 'active' | 'completed' | 'cancelled'
}

export interface Attachment {
  fileUrl: string

  fileType?: string

  category?: 'lab' | 'xray' | 'document' | 'other'

  uploadedAt?: Date
}

export interface LabResult {
  testName?: string

  result?: string

  normalRange?: string

  notes?: string
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

  encounterType?:
    | 'consultation'
    | 'follow-up'
    | 'emergency'
    | 'telemedicine'

  chiefComplaint?: string

  diagnoses?: Diagnosis[]

  prescriptions?: Prescription[]

  labResults?: LabResult[]

  attachments?: Attachment[]

  vitals?: Vitals

  soap?: {
    subjective?: string
    objective?: string
    assessment?: string
    plan?: string
  }

  notes?: string

  followUpDate?: Date

  metadata?: Record<string, any>

  createdAt: Date
  updatedAt: Date
}

/* =========================
   SCHEMAS
========================= */

const DiagnosisSchema = new mongoose.Schema<Diagnosis>(
  {
    condition: {
      type: String,
      required: true,
    },

    icd: {
      system: {
        type: String,
        enum: ['ICD-10', 'ICD-11'],
        default: 'ICD-10',
      },

      code: String,

      description: String,
    },

    notes: String,
  },
  { _id: false },
)

const PrescriptionSchema = new mongoose.Schema<Prescription>(
  {
    medicineName: {
      type: String,
      required: true,
    },

    dosage: {
      amount: {
        type: Number,
        min: 0,
      },

      unit: {
        type: String,
        enum: ['mg', 'g', 'ml', 'mcg', 'tablet', 'capsule'],
      },
    },

    frequency: {
      type: String,
      required: true,
    },

    duration: String,

    instructions: String,

    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
    },
  },
  { _id: false },
)

const AttachmentSchema = new mongoose.Schema<Attachment>(
  {
    fileUrl: {
      type: String,
      required: true,
    },

    fileType: String,

    category: {
      type: String,
      enum: ['lab', 'xray', 'document', 'other'],
      default: 'document',
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
)

const LabResultSchema = new mongoose.Schema<LabResult>(
  {
    testName: String,

    result: String,

    normalRange: String,

    notes: String,
  },
  { _id: false },
)

const VitalsSchema = new mongoose.Schema<Vitals>(
  {
    bloodPressure: {
      systolic: {
        type: Number,
        min: 50,
        max: 250,
      },

      diastolic: {
        type: Number,
        min: 30,
        max: 150,
      },
    },

    heartRate: {
      type: Number,
      min: 20,
      max: 250,
    },

    temperature: {
      value: {
        type: Number,
        min: 25,
        max: 45,
      },

      unit: {
        type: String,
        enum: ['C', 'F'],
        default: 'C',
      },
    },

    weight: {
      value: {
        type: Number,
        min: 0,
      },

      unit: {
        type: String,
        enum: ['kg', 'lb'],
        default: 'kg',
      },
    },

    height: {
      value: {
        type: Number,
        min: 0,
      },

      unit: {
        type: String,
        enum: ['cm', 'ft'],
        default: 'cm',
      },
    },

    oxygenSaturation: {
      type: Number,
      min: 0,
      max: 100,
    },

    recordedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
)

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

    encounterType: {
      type: String,
      enum: ['consultation', 'follow-up', 'emergency', 'telemedicine'],
      default: 'consultation',
    },

    chiefComplaint: String,

    diagnoses: {
      type: [DiagnosisSchema],
      default: [],
    },

    prescriptions: {
      type: [PrescriptionSchema],
      default: [],
    },

    labResults: {
      type: [LabResultSchema],
      default: [],
    },

    attachments: {
      type: [AttachmentSchema],
      default: [],
    },

    vitals: VitalsSchema,

    soap: {
      subjective: String,

      objective: String,

      assessment: String,

      plan: String,
    },

    notes: String,

    followUpDate: Date,

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true },
)

/* =========================
   MODEL EXPORT
========================= */

const medicalRecordModel =
  mongoose.models.MedicalRecord as mongoose.Model<MedicalRecordDocument> | undefined

export const MedicalRecordModel =
  medicalRecordModel ??
  mongoose.model<MedicalRecordDocument>('MedicalRecord', medicalRecordSchema)