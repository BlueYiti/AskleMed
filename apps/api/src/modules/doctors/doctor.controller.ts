import type { Request, Response } from 'express'
import { DoctorModel } from './doctor.model.js'

export async function listDoctors(_req: Request, res: Response) {
  const doctors = await DoctorModel.find().select('name email specialty phone').lean()
  res.json(doctors)
}

export async function getDoctor(req: Request, res: Response) {
  const doctor = await DoctorModel.findById(req.params.id).select('name email specialty phone').lean()
  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' })
  }
  res.json(doctor)
}

export async function createDoctor(req: Request, res: Response) {
  const { name, email, specialty, phone } = req.body
  if (!name || !email || !specialty) {
    return res.status(400).json({ error: 'name, email, and specialty are required' })
  }

  const doctor = await DoctorModel.create({ name, email, specialty, phone })
  res.status(201).json(doctor)
}
