import type { Request, Response } from 'express'
import { PatientModel } from './patient.model.js'

export async function listPatients(_req: Request, res: Response) {
  const patients = await PatientModel.find().select('name email phone dateOfBirth').lean()
  res.json(patients)
}

export async function getPatient(req: Request, res: Response) {
  const patient = await PatientModel.findById(req.params.id).select('name email phone dateOfBirth').lean()
  if (!patient) {
    return res.status(404).json({ error: 'Patient not found' })
  }
  res.json(patient)
}

export async function createPatient(req: Request, res: Response) {
  const { name, email, phone, dateOfBirth } = req.body
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' })
  }

  const patient = await PatientModel.create({ name, email, phone, dateOfBirth })
  res.status(201).json(patient)
}
