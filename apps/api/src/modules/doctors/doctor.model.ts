import mongoose, {
  type Document,
  type Model,
} from "mongoose";

import {
  SPECIALIZATION_KEYS,
} from "../../types/specializations.js";

export interface DoctorDocument
  extends Document {
  authId: string;

  name: string;
  email: string;

  specialization:
    (typeof SPECIALIZATION_KEYS)[number];

  licenseNumber: string;

  experienceYears: number;

  photoUrl: string;

  bio?: string;

  calLink: string;

  consultationTypes: string[];

  consultationFee?: number;

  clinicName?: string;

  clinicAddress?: string;

  languages?: string[];

  phone?: string;

  isVerified: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const doctorSchema =
  new mongoose.Schema<DoctorDocument>(
    {
      /* =========================
         AUTH LINK
      ========================= */

      authId: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },

      /* =========================
         BASIC INFO
      ========================= */

      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      phone: {
        type: String,
        default: "",
      },

      photoUrl: {
        type: String,
        default:
          "/images/default-doctor.png",
      },

      bio: {
        type: String,
        default: "",
      },

      /* =========================
         PROFESSIONAL INFO
      ========================= */

      specialization: {
        type: String,
        enum: SPECIALIZATION_KEYS,
        required: true,
        index: true,
      },

      licenseNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

      experienceYears: {
        type: Number,
        default: 0,
        min: 0,
      },

      isVerified: {
        type: Boolean,
        default: false,
      },

      /* =========================
         CONSULTATION
      ========================= */

      consultationTypes: {
        type: [String],
        default: [],
      },

      consultationFee: {
        type: Number,
        default: 0,
      },

      calLink: {
        type: String,
        default: "",
      },

      /* =========================
         CLINIC
      ========================= */

      clinicName: {
        type: String,
        default: "",
      },

      clinicAddress: {
        type: String,
        default: "",
      },

      languages: {
        type: [String],
        default: [],
      },
    },
    {
      timestamps: true,
    }
  );

/* =========================
   INDEXES
========================= */

doctorSchema.index({
  specialization: 1,
  isVerified: 1,
});

doctorSchema.index({
  name: "text",
  clinicName: "text",
});

/* =========================
   EXPORT MODEL
========================= */

const doctorModel =
  mongoose.models.Doctor as
    | Model<DoctorDocument>
    | undefined;

export const DoctorModel =
  doctorModel ??
  mongoose.model<DoctorDocument>(
    "Doctor",
    doctorSchema
  );