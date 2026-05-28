import type {
  Request,
  Response
} from 'express'

import { analyzeSymptoms } from './ai.service.js'
import { DoctorModel } from '../doctors/doctor.model.js'

export async function recommendDoctors(
  req: Request,
  res: Response
) {
  try {
    const { symptoms } = req.body

    if (!symptoms) {
      return res.status(400).json({
        message: 'Symptoms are required'
      })
    }

    const aiResult =
      await analyzeSymptoms(symptoms)

    const doctors = await DoctorModel.find({
      specialization:
        aiResult.specializationKey
    })

    return res.json({
      recommendation: aiResult,
      doctors
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Failed to recommend doctors',
      error
    })
  }
}