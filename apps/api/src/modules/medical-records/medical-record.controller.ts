import type { Request, Response } from 'express'
import { MedicalRecordModel } from './medical-record.model.js'
import mongoose from 'mongoose'

/* =========================
   CREATE MEDICAL RECORD
========================= */

export const createMedicalRecord = async (req: Request, res: Response) => {
  try {
    const medicalRecord = await MedicalRecordModel.create(req.body)

    return res.status(201).json({
      success: true,
      data: medicalRecord,
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

/* =========================
   GET ALL MEDICAL RECORDS
========================= */

export const getMedicalRecords = async (_req: Request, res: Response) => {
  try {
    const medicalRecords = await MedicalRecordModel.find()
      .populate('patient')
      .populate('doctor')
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      count: medicalRecords.length,
      data: medicalRecords,
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

/* =========================
   GET SINGLE RECORD
========================= */

export const getMedicalRecordById = async (req: Request, res: Response) => {
  try {
    const medicalRecord = await MedicalRecordModel.findById(req.params.id)
      .populate('patient')
      .populate('doctor')

    if (!medicalRecord) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: medicalRecord,
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

/* =========================
   GET RECORDS BY PATIENT
========================= */

export const getMedicalRecordsByPatient = async (
  req: Request,
  res: Response,
) => {
  try {
    const { patientId } = req.params

    if (!patientId || Array.isArray(patientId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid patientId',
      })
    }

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid patientId format',
      })
    }

    const records = await MedicalRecordModel.find({
      patient: new mongoose.Types.ObjectId(patientId),
    })
      .populate('doctor')
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

/* =========================
   UPDATE RECORD
========================= */

export const updateMedicalRecord = async (
  req: Request,
  res: Response,
) => {
  try {
    const updatedRecord = await MedicalRecordModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    )

    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: updatedRecord,
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

/* =========================
   DELETE RECORD
========================= */

export const deleteMedicalRecord = async (
  req: Request,
  res: Response,
) => {
  try {
    const deletedRecord = await MedicalRecordModel.findByIdAndDelete(
      req.params.id,
    )

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Medical record deleted successfully',
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}