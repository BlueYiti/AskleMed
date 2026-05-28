import type { Request, Response } from 'express'
import { AppointmentModel } from './appointment.model.js'
import { auth } from '../../lib/auth.js'

/**
 * GET all appointments (admin/debug use)
 */
export async function listAppointments(
  _req: Request,
  res: Response
) {
  try {
    const appointments = await AppointmentModel.find()
      .sort({ startsAt: -1 })
      .lean()

    return res.json({
      success: true,
      count: appointments.length,
      appointments,
    })
  } catch (error) {
    console.error('❌ listAppointments error:', error)

    return res.status(500).json({
      error: 'Server error',
    })
  }
}

/**
 * CREATE appointment (manual creation)
 */
export async function createAppointment(
  req: Request,
  res: Response
) {
  try {
    const {
      patientName,
      patientEmail,
      doctorName,
      doctorEmail,
      reason,
      startsAt,
      endsAt,
    } = req.body

    // validation
    if (
      !patientName ||
      !patientEmail ||
      !doctorName ||
      !doctorEmail ||
      !startsAt ||
      !endsAt
    ) {
      return res.status(400).json({
        error:
          'patientName, patientEmail, doctorName, doctorEmail, startsAt, endsAt are required',
      })
    }

    const appointment = await AppointmentModel.create({
      patientName,
      patientEmail,

      doctorName,
      doctorEmail,

      reason: reason || '',

      startsAt: new Date(startsAt),
      endsAt: new Date(endsAt),

      status: 'confirmed',
    })

    return res.status(201).json({
      success: true,
      appointment,
    })
  } catch (error) {
    console.error('❌ createAppointment error:', error)

    return res.status(500).json({
      error: 'Server error',
    })
  }
}

/**
 * GET MY APPOINTMENTS (PATIENT)
 */
export async function getMyAppointments(
  req: Request,
  res: Response
) {
  try {
    // ✅ Get BetterAuth session from request headers
    const session = await auth.api.getSession({
      headers: req.headers,
    })

    const user = session?.user

    if (!user?.email) {
      return res.status(401).json({
        error: 'Unauthorized',
      })
    }

    // ✅ Find appointments belonging to logged-in patient
    const appointments = await AppointmentModel.find({
      patientEmail: user.email,
    }).sort({ startsAt: -1 })

    return res.json({
      success: true,
      count: appointments.length,
      appointments,
    })
  } catch (error) {
    console.error('❌ getMyAppointments error:', error)

    return res.status(500).json({
      error: 'Server error',
    })
  }
}

/**
 * GET DOCTOR APPOINTMENTS
 */
export async function getDoctorAppointments(
  req: Request,
  res: Response
) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    })

    const user = session?.user

    if (!user?.email) {
      return res.status(401).json({
        error: 'Unauthorized',
      })
    }

    // ✅ Find appointments belonging to logged-in doctor
    const appointments = await AppointmentModel.find({
      doctorEmail: user.email,
    }).sort({ startsAt: -1 })

    return res.json({
      success: true,
      count: appointments.length,
      appointments,
    })
  } catch (error) {
    console.error('❌ getDoctorAppointments error:', error)

    return res.status(500).json({
      error: 'Server error',
    })
  }
}