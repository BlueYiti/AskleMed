import mongoose, { Schema, type Document, type Types } from "mongoose";

export type ConsultationStatus =
  | "upcoming"
  | "completed"
  | "cancelled"
  | "in_progress";

export interface Consultation extends Document {
  patientId: Types.ObjectId;
  doctorId: Types.ObjectId;

  diagnosis?: string;

  schedule: {
    startsAt: Date;
    endsAt?: Date;
  };

  status: ConsultationStatus;

  documents: {
    hasPrescription: boolean;
    hasCertificate: boolean;
    hasLabRequest: boolean;
  };

  notes?: string;

  createdAt: Date;
  updatedAt: Date;
}

const ConsultationSchema = new Schema<Consultation>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },

    diagnosis: { type: String },

    schedule: {
      startsAt: { type: Date, required: true },
      endsAt: { type: Date },
    },

    status: {
      type: String,
      enum: ["upcoming", "completed", "cancelled", "in_progress"],
      default: "upcoming",
    },

    documents: {
      hasPrescription: { type: Boolean, default: false },
      hasCertificate: { type: Boolean, default: false },
      hasLabRequest: { type: Boolean, default: false },
    },

    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<Consultation>(
  "Consultation",
  ConsultationSchema
);