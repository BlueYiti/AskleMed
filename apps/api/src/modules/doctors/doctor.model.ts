import mongoose, { type Document, type Model } from "mongoose";
import { SPECIALIZATION_KEYS } from '../../types/specializations.js';

export interface DoctorDocument extends Document {
  name: string;
  email: string;
  calLink: string;

  specialization: (typeof SPECIALIZATION_KEYS)[number];
  experienceYears: number;
  photoUrl: string;

  bio?: string;

  consultationTypes: string[];
  consultationFee?: number;

  availability: {
    isAvailableToday: boolean;
    nextSlot?: Date;
    schedule?: {
      day:
        | "Monday"
        | "Tuesday"
        | "Wednesday"
        | "Thursday"
        | "Friday"
        | "Saturday"
        | "Sunday";
      startTime: string;
      endTime: string;
    }[];
  };

  clinicName?: string;
  clinicAddress?: string;

  languages?: string[];

  phone?: string;

  createdAt: Date;
  updatedAt: Date;
}

const doctorSchema = new mongoose.Schema<DoctorDocument>(
  {
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

    specialization: {
      type: String,
      enum: SPECIALIZATION_KEYS,
      required: true,
      index: true
    },

    experienceYears: {
      type: Number,
      default: 0,
      min: 0,
    },

    photoUrl: {
      type: String,
      default: "/images/default-doctor.png",
    },

    calLink: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    consultationTypes: {
      type: [String],
      default: [],
    },

    consultationFee: {
      type: Number,
      default: 0,
    },

    availability: {
      isAvailableToday: {
        type: Boolean,
        default: true,
      },
      nextSlot: {
        type: Date,
      },
      schedule: [
        {
          day: {
            type: String,
            enum: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
          },
          startTime: {
            type: String,
          },
          endTime: {
            type: String,
          },
        },
      ],
    },

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

    phone: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in dev (Next.js hot reload safe)
const doctorModel =
  mongoose.models.Doctor as Model<DoctorDocument> | undefined;

export const DoctorModel =
  doctorModel ?? mongoose.model<DoctorDocument>("Doctor", doctorSchema);