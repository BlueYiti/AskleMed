import type { Request, Response } from 'express'

import { AppointmentModel } from '../appointments/appointment.model.js'
import { PatientModel } from '../patients/patient.model.js'

export async function calcomWebhook(req: Request, res: Response) {
  try {
    const body = req.body

    console.log('🔥 WEBHOOK RECEIVED')
    console.log('Event:', body.triggerEvent)

    const event = body.triggerEvent
    const payload = body.payload

    /* =========================
       PING
    ========================= */
    if (event === 'PING') {
      return res.status(200).json({
        success: true,
        type: 'ping',
      })
    }

    const calEventId = payload.uid || payload.bookingId?.toString()

    if (!calEventId) {
      return res.status(400).json({
        success: false,
        error: 'Missing calEventId',
      })
    }

    const attendee = payload.attendees?.[0] || {}

    const name =
      payload.responses?.name?.value ||
      attendee.name ||
      'Unknown Patient'

    const email =
      payload.responses?.email?.value ||
      attendee.email ||
      null

    const patient = email
      ? await PatientModel.findOne({ email }).select('_id authId')
      : null

    /* =========================
       EVENT HANDLING
    ========================= */
    switch (event) {
      /* =========================
         CREATED
      ========================= */
      case 'BOOKING_CREATED': {
        const existing = await AppointmentModel.findOne({ calEventId })

        if (existing) {
          return res.status(200).json({
            success: true,
            duplicate: true,
          })
        }

        const appointment = await AppointmentModel.create({
          patientId: patient?._id || null,

          patientName: name,
          patientEmail: email,

          doctorName: payload.organizer?.name || 'Doctor',
          doctorEmail: payload.organizer?.email || '',

          calEventId,

          startsAt: new Date(payload.startTime),
          endsAt: new Date(payload.endTime),

          meetingLink:
            payload.videoCallData?.url ||
            payload.metadata?.videoCallUrl ||
            payload.location ||
            '',

          status: 'confirmed',
        })

        return res.status(200).json({
          success: true,
          action: 'created',
          appointmentId: appointment._id,
        })
      }

      /* =========================
         CANCELLED
      ========================= */
      case 'BOOKING_CANCELLED': {
        await AppointmentModel.findOneAndUpdate(
          { calEventId },
          { status: 'cancelled' }
        )

        return res.status(200).json({
          success: true,
          action: 'cancelled',
        })
      }

      /* =========================
         RESCHEDULED
      ========================= */
      case 'BOOKING_RESCHEDULED': {
        await AppointmentModel.findOneAndUpdate(
          { calEventId },
          {
            startsAt: new Date(payload.startTime),
            endsAt: new Date(payload.endTime),
            status: 'rescheduled',
          }
        )

        return res.status(200).json({
          success: true,
          action: 'rescheduled',
        })
      }

      /* =========================
         REJECTED
      ========================= */
      case 'BOOKING_REJECTED': {
        await AppointmentModel.findOneAndUpdate(
          { calEventId },
          { status: 'rejected' }
        )

        return res.status(200).json({
          success: true,
          action: 'rejected',
        })
      }

      /* =========================
         DEFAULT
      ========================= */
      default:
        return res.status(200).json({
          success: true,
          ignored: true,
        })
    }
  } catch (error) {
    console.error('❌ Webhook error:', error)

    return res.status(500).json({
      success: false,
      error: String(error),
    })
  }
}