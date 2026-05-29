// apps/api/src/modules/auth/auth.controller.ts

import type { Request, Response } from 'express'
import { fromNodeHeaders } from 'better-auth/node'

import { auth } from '../../lib/auth.js'

import {
  UserModel,
  type UserRole,
} from '../users/user.model.js'

import { PatientModel } from '../patients/patient.model.js'
import { PatientProfileModel } from '../patient-profile/patient-profile.model.js'
import { DoctorModel } from '../doctors/doctor.model.js'

const allowedRoles = new Set<UserRole>([
  'patient',
  'doctor',
  'admin',
])

type AuthApiResult<T> = {
  headers?: Headers
  response: T
  status?: number
}

type AuthUser = {
  id: string
  email: string
  name: string
  image?: string | null
  emailVerified: boolean
  role?: UserRole
}

type RegisterBody = {
  name: string
  email: string
  password: string
  role?: UserRole

  // Patient
  phone?: string
  dateOfBirth?: string
  insuranceProvider?: string

  // Doctor
  specialization?: string
  licenseNumber?: string
  hospital?: string
  yearsOfExperience?: number
}

function roleOrDefault(role: unknown): UserRole {
  return typeof role === 'string' &&
    allowedRoles.has(role as UserRole)
    ? (role as UserRole)
    : 'patient'
}

function applyAuthHeaders(
  res: Response,
  headers?: Headers,
) {
  if (!headers) {
    return
  }

  const getSetCookie = (
    headers as Headers & {
      getSetCookie?: () => string[]
    }
  ).getSetCookie

  const setCookies =
    typeof getSetCookie === 'function'
      ? getSetCookie.call(headers)
      : []

  for (const cookie of setCookies) {
    res.append('Set-Cookie', cookie)
  }

  headers.forEach((value, key) => {
    if (
      key.toLowerCase() === 'set-cookie' &&
      setCookies.length > 0
    ) {
      return
    }

    res.setHeader(key, value)
  })
}

function toPublicUser(user: AuthUser) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: roleOrDefault(user.role),
    image: user.image ?? null,
    emailVerified: user.emailVerified,
  }
}

function sendAuthError(
  res: Response,
  error: unknown,
) {
  const status =
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    typeof error.statusCode === 'number'
      ? error.statusCode
      : 500

  const message =
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
      ? error.message
      : 'Authentication failed'

  return res.status(status).json({
    error: message,
  })
}

/* =====================================================
   REGISTER
===================================================== */

export async function register(
  req: Request<{}, {}, RegisterBody>,
  res: Response,
) {
  try {
    const {
      name,
      email,
      password,
      role,

      // Patient
      phone,
      dateOfBirth,
      insuranceProvider,

      // Doctor
      specialization,
      licenseNumber,
      hospital,
      yearsOfExperience,
    } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        error:
          'name, email, and password are required',
      })
    }

    /* =========================
       CREATE AUTH USER
    ========================= */

    const authResult =
      (await auth.api.signUpEmail({
        body: {
          name,
          email,
          password,
          role: roleOrDefault(role),
        },

        headers: fromNodeHeaders(req.headers),

        returnHeaders: true,
        returnStatus: true,
      } as any)) as unknown as AuthApiResult<{
        token: string | null
        user: AuthUser
      }>

    applyAuthHeaders(res, authResult.headers)

    const authUser = authResult.response.user

    /* =========================
       CREATE INTERNAL USER
    ========================= */

    await UserModel.findOneAndUpdate(
      {
        authId: authUser.id,
      },
      {
        authId: authUser.id,

        email: authUser.email,
        name: authUser.name,

        role: roleOrDefault(authUser.role),

        avatar:
          authUser.image ?? undefined,

        isVerified:
          authUser.emailVerified,

        isActive: true,
      },
      {
        upsert: true,
        returnDocument: 'after',
        setDefaultsOnInsert: true,
      },
    )

    const userRole =
      roleOrDefault(authUser.role);

    /* =========================
      PATIENT
    ========================= */

    if (userRole === "patient") {
      const patient =
        await PatientModel.findOneAndUpdate(
          {
            authId: authUser.id,
          },
          {
            authId: authUser.id,

            name: authUser.name,
            email: authUser.email,

            phone: phone ?? "",
            dateOfBirth:
              dateOfBirth ?? null,

            insuranceProvider:
              insuranceProvider ?? "",
          },
          {
            upsert: true,
            returnDocument: "after",
            setDefaultsOnInsert: true,
          },
        );

      if (!patient?._id) {
        throw new Error(
          "Failed to create patient",
        );
      }

      await PatientProfileModel.findOneAndUpdate(
        {
          patientId: patient._id,
        },
        {
          patientId: patient._id,

          basicInfo: {
            firstName: authUser.name,

            email: authUser.email,

            phone: phone ?? "",

            dateOfBirth:
              dateOfBirth ?? null,
          },

          healthInfo: {
            conditions: [],
            medications: [],
            allergies: [],
            surgeries: [],
            familyHistory: [],
          },

          emergencyContact: {
            name: "",
            phone: "",
            relationship: "",
          },
        },
        {
          upsert: true,
          returnDocument: "after",
          setDefaultsOnInsert: true,
        },
      );
    }

    /* =========================
      DOCTOR
    ========================= */

    if (userRole === "doctor") {
      await DoctorModel.findOneAndUpdate(
        {
          authId: authUser.id,
        },
        {
          authId: authUser.id,

          name: authUser.name,
          email: authUser.email,

          phone: phone ?? "",

          specialization:
            specialization ?? "",

          licenseNumber:
            licenseNumber ?? "",

          clinicName:
            hospital ?? "",

          experienceYears:
            yearsOfExperience ?? 0,
        },
        {
          upsert: true,
          returnDocument: "after",
          setDefaultsOnInsert: true,
        },
      );
    }

    return res.status(201).json({
      token: authResult.response.token,

      user: toPublicUser(
        authResult.response.user,
      ),
    })
  } catch (error) {
    console.error(error)

    return sendAuthError(res, error)
  }
}

/* =====================================================
   LOGIN
===================================================== */

export async function login(
  req: Request,
  res: Response,
) {
  try {
    const {
      email,
      password,
      rememberMe,
    } = req.body

    if (!email || !password) {
      return res.status(400).json({
        error:
          'email and password are required',
      })
    }

    const authResult =
      (await auth.api.signInEmail({
        body: {
          email,
          password,
          rememberMe:
            rememberMe ?? true,
        },

        headers: fromNodeHeaders(
          req.headers,
        ),

        returnHeaders: true,
        returnStatus: true,
      } as any)) as unknown as AuthApiResult<{
        redirect: boolean
        token: string
        url?: string
        user: AuthUser
      }>

    const profile =
      await UserModel.findOne({
        authId:
          authResult.response.user.id,
      }).lean()

    applyAuthHeaders(
      res,
      authResult.headers,
    )

    return res.json({
      token: authResult.response.token,

      user: {
        ...toPublicUser(
          authResult.response.user,
        ),

        role:
          profile?.role ??
          roleOrDefault(
            authResult.response.user.role,
          ),
      },
    })
  } catch (error) {
    return sendAuthError(res, error)
  }
}

/* =====================================================
   ME
===================================================== */

export async function me(
  req: Request,
  res: Response,
) {
  try {
    const session =
      await auth.api.getSession({
        headers: fromNodeHeaders(
          req.headers,
        ),
      })

    if (!session) {
      return res.status(401).json({
        error: 'Unauthorized',
      })
    }

    const profile =
      await UserModel.findOne({
        authId: session.user.id,
      }).lean()

    return res.json({
      user: {
        ...toPublicUser(
          session.user as AuthUser,
        ),

        role:
          profile?.role ??
          roleOrDefault(
            (session.user as AuthUser)
              .role,
          ),
      },

      session: session.session,
    })
  } catch (error) {
    return sendAuthError(res, error)
  }
}
