import type { Request, Response } from 'express'
import { AppointmentModel } from '../appointments/appointment.model.js'

export async function calcomWebhook(req: Request, res: Response) {
  try {
    const body = req.body
    
    console.log('🔥 WEBHOOK RECEIVED')
    console.log('Event:', body.triggerEvent)
    console.log('Payload:', JSON.stringify(body.payload, null, 2))

    const event = body.triggerEvent
    const payload = body.payload

    // 1. Handle PING (Cal.com test webhook)
    if (event === 'PING') {
      console.log('✅ PING received - webhook is working')
      return res.status(200).json({ success: true, type: 'ping' })
    }

    // 2. Only handle booking creation for now
    if (event !== 'BOOKING_CREATED') {
      console.log('⏭ Ignored event:', event)
      return res.status(200).json({ success: true, ignored: true })
    }

    // 3. Extract attendee safely (Cal.com format varies)
    const attendee =
      payload.attendees?.[0] ||
      {}

    const name =
      payload.responses?.name?.value ||
      attendee.name ||
      'Unknown Patient'

    const email =
      payload.responses?.email?.value ||
      attendee.email ||
      ''

    // 4. Create appointment
    const appointment = await AppointmentModel.create({
      patientName: name,
      patientEmail: email,

      doctorName: payload.organizer?.name || 'Doctor',
      doctorEmail: payload.organizer?.email || '',

      calEventId: payload.uid || payload.bookingId?.toString(),

      startsAt: new Date(payload.startTime),
      endsAt: new Date(payload.endTime),

      meetingLink:
        payload.videoCallData?.url ||
        payload.metadata?.videoCallUrl ||
        payload.location ||
        '',

      status: 'confirmed',
    })

    console.log('💾 Appointment saved:', appointment._id)

    return res.status(200).json({
      success: true,
      appointmentId: appointment._id,
    })
  } catch (error) {
    console.error('❌ Webhook error:', error)

    return res.status(500).json({
      success: false,
      error: String(error),
    })
  }
}