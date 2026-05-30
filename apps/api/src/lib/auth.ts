import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { z } from 'zod'

import { client, connectDB } from "../config/db.js";
import { env } from '../config/env.js'

import { UserModel } from '../modules/users/user.model.js'
import { PatientModel } from '../modules/patients/patient.model.js'
import { PatientProfileModel } from '../modules/patient-profile/patient-profile.model.js'

const db = client.db(env.MONGODB_NAME)

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,

  database: mongodbAdapter(db, {
    client,
    transaction: false,
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: 'patient',
        validator: {
          input: z.enum(['patient', 'doctor', 'admin']),
        },
      },
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7,
    },
  },

  cookies: {
    sessionToken: {
      sameSite: "none",
      secure: true,
    },
  },

  trustedOrigins: [
    "http://localhost:3000",
    "https://askle-med-web.vercel.app",
    "https://askle-med-api.vercel.app",
  ],

  databaseHooks: {
    user: {
      create: {
        async after(user) {
          await connectDB();
          
          if (!user?.id) {
            throw new Error('Missing auth user id')
          }

          /* =========================
             1. INTERNAL USER MODEL
          ========================= */
          await UserModel.findOneAndUpdate(
            { authId: user.id },
            {
              authId: user.id,
              email: user.email,
              name: user.name,
              role: user.role ?? 'patient',
              avatar: user.image ?? undefined,
              isVerified: user.emailVerified,
              isActive: true,
            },
            {
              upsert: true,
              setDefaultsOnInsert: true,
              returnDocument: 'after',
            },
          )

          /* =========================
             2. PATIENT (IDEMPOTENT)
          ========================= */

          const patient = await PatientModel.findOneAndUpdate(
            { authId: user.id },
            {
              authId: user.id,
              name: user.name,
              email: user.email,
              phone: '',
              dateOfBirth: null,
            },
            {
              upsert: true,
              new: true,
              setDefaultsOnInsert: true,
            },
          )

          if (!patient?._id) {
            throw new Error('Failed to create or retrieve patient')
          }

          /* =========================
             3. PATIENT PROFILE (IDEMPOTENT)
          ========================= */

          await PatientProfileModel.findOneAndUpdate(
            { patientId: patient._id },
            {
              patientId: patient._id,

              basicInfo: {
                firstName: user.name,
                email: user.email,
              },

              healthInfo: {
                conditions: [],
                medications: [],
                allergies: [],
                surgeries: [],
                familyHistory: [],
              },

              emergencyContact: {
                name: '',
                phone: '',
                relationship: '',
              },
            },
            {
              upsert: true,
              new: true,
              setDefaultsOnInsert: true,
            },
          )
        },
      },

      update: {
        async after(user) {
          await connectDB();

          if (!user?.id) return

          await UserModel.findOneAndUpdate(
            { authId: user.id },
            {
              email: user.email,
              name: user.name,
              role: user.role ?? 'patient',
              avatar: user.image ?? undefined,
              isVerified: user.emailVerified,
            },
            {
              returnDocument: 'after',
            },
          )
        },
      },
    },
  },
})