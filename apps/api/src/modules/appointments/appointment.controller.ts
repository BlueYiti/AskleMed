import type { Request, Response } from 'express'
import { AppointmentModel } from './appointment.model.js'
import { DoctorModel } from '../doctors/doctor.model.js'
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
      headers: Object.fromEntries(
        Object.entries(req.headers).map(([k, v]) => [
          k,
          Array.isArray(v) ? v.join(',') : v ?? '',
        ])
      )
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
    })
      .sort({ startsAt: -1 })
      .lean()

    const appointmentsWithDoctor = await Promise.all(
      appointments.map(async (appointment) => {

        const doctor = await DoctorModel.findOne({
          email: appointment.doctorEmail,
        }).lean()

        return {
          _id: appointment._id,

          patientName: appointment.patientName,
          patientEmail: appointment.patientEmail,

          doctorName: appointment.doctorName,
          doctorEmail: appointment.doctorEmail,

          startsAt: appointment.startsAt,
          endsAt: appointment.endsAt,

          status: appointment.status,
          meetingLink: appointment.meetingLink,
          reason: appointment.reason,

          doctorPhotoUrl:
            doctor?.photoUrl || null,
        }
      })
    )

    return res.json({
      success: true,
      count: appointmentsWithDoctor.length,
      appointments: appointmentsWithDoctor,
    })
  } catch (error) {
    console.error('❌ getMyAppointments error:', error)

    return res.status(500).json({
      error: 'Server error',
    })
  }
}

/**
 * GET SINGLE APPOINTMENT
 */
export async function getAppointmentById(
  req: Request,
  res: Response
) {
  try {
    const session = await auth.api.getSession({
      headers: Object.fromEntries(
        Object.entries(req.headers).map(([k, v]) => [
          k,
          Array.isArray(v) ? v.join(',') : v ?? '',
        ])
      )
    })

    const user = session?.user

    if (!user?.email) {
      return res.status(401).json({
        error: 'Unauthorized',
      })
    }

    const { appointmentId } = req.params

    const appointment =
      await AppointmentModel.findById(
        appointmentId
      ).lean()

    if (!appointment) {
      return res.status(404).json({
        error: 'Appointment not found',
      })
    }

    /**
     * SECURITY:
     * Only owner patient OR doctor can view
     */
    const isPatient = appointment.patientEmail === user.email
    const isDoctor = appointment.doctorEmail === user.email

    if (!isPatient && !isDoctor) {
      return res.status(403).json({
        error: 'Forbidden',
      })
    }

    const doctor = await DoctorModel.findOne({
      email: appointment.doctorEmail,
    }).lean()

    return res.json({
      _id: appointment._id,

      patientName: appointment.patientName,
      patientEmail: appointment.patientEmail,

      doctorName: appointment.doctorName,
      doctorEmail: appointment.doctorEmail,

      startsAt: appointment.startsAt,
      endsAt: appointment.endsAt,

      status: appointment.status,

      meetingLink: appointment.meetingLink,

      reason: appointment.reason,

      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,

      doctorPhotoUrl:
        doctor?.photoUrl || null,
    })
  } catch (error) {
    console.error(
      '❌ getAppointmentById error:',
      error
    )

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
      headers: Object.fromEntries(
        Object.entries(req.headers).map(([k, v]) => [
          k,
          Array.isArray(v) ? v.join(',') : v ?? '',
        ])
      )
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