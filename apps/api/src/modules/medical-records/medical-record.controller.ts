import type { Request, Response } from 'express'
import { MedicalRecordModel } from './medical-record.model.js'

export async function listMedicalRecords(_req: Request, res: Response) {
  const records = await MedicalRecordModel.find()
    .populate('patient', 'name email')
    .populate('doctor', 'name email specialty')
    .lean()
  res.json(records)
}

export async function getMedicalRecord(req: Request, res: Response) {
  const record = await MedicalRecordModel.findById(req.params.id)
    .populate('patient', 'name email')
    .populate('doctor', 'name email specialty')
    .lean()

  if (!record) {
    return res.status(404).json({ error: 'Medical record not found' })
  }

  res.json(record)
}

export async function createMedicalRecord(req: Request, res: Response) {
  const { patient, doctor, notes } = req.body
  if (!patient || !doctor || !notes) {
    return res.status(400).json({ error: 'patient, doctor, and notes are required' })
  }

  const record = await MedicalRecordModel.create({ patient, doctor, notes })
  res.status(201).json(record)
}
