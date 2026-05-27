import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { z } from 'zod'

import { client } from '../config/db.js'
import { env } from '../config/env.js'
import { UserModel } from '../modules/users/user.model.js'

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
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  },

  trustedOrigins: [
    'http://localhost:3000',
  ],

  databaseHooks: {
    user: {
      create: {
        async after(user) {
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
              new: true,
              upsert: true,
              setDefaultsOnInsert: true,
            }
          )
        },
      },
      update: {
        async after(user) {
          await UserModel.findOneAndUpdate(
            { authId: user.id },
            {
              email: user.email,
              name: user.name,
              role: user.role ?? 'patient',
              avatar: user.image ?? undefined,
              isVerified: user.emailVerified,
            },
            { new: true }
          )
        },
      },
    },
  },
})
