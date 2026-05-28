import mongoose, { Schema, Document } from "mongoose";

export interface IUserMapping extends Document {
  email: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserMappingSchema = new Schema<IUserMapping>(
  {
    /**
     * Email coming from auth provider (BetterAuth)
     * and also used by Cal.com attendee payload
     */
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },

    /**
     * Your internal system userId (BetterAuth / DB user reference)
     */
    userId: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Prevent model overwrite during hot reload (Next.js / dev server)
 */
export const UserMappingModel =
  mongoose.models.UserMapping ||
  mongoose.model<IUserMapping>("UserMapping", UserMappingSchema);