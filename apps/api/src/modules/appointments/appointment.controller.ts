import type { Request, Response } from 'express'
import { AppointmentModel } from './appointment.model.js'

export async function listAppointments(_req: Request, res: Response) {
  const appointments = await AppointmentModel.find()
    .populate('patient', 'name email')
    .populate('doctor', 'name email specialty')
    .lean()
  res.json(appointments)
}

export async function createAppointment(req: Request, res: Response) {
  const { patient, doctor, reason, startsAt, endsAt } = req.body
  if (!patient || !doctor || !reason || !startsAt || !endsAt) {
    return res.status(400).json({ error: 'patient, doctor, reason, startsAt, and endsAt are required' })
  }

  const appointment = await AppointmentModel.create({
    patient,
    doctor,
    reason,
    startsAt: new Date(startsAt),
    endsAt: new Date(endsAt),
  })
  res.status(201).json(appointment)
}
