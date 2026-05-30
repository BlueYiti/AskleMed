import type { Request, Response } from 'express'

import { PatientProfileModel } from './patient-profile.model.js'

/* =========================
   CREATE PROFILE
========================= */

export const createPatientProfile = async (
  req: Request,
  res: Response,
) => {
  try {
    const existingProfile = await PatientProfileModel.findOne({
      patientId: req.body.patientId,
    })

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: 'Patient profile already exists',
      })
    }

    const profile = await PatientProfileModel.create(req.body)

    return res.status(201).json({
      success: true,
      data: profile,
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

/* =========================
   GET ALL PROFILES
========================= */

export const getPatientProfiles = async (
  _req: Request,
  res: Response,
) => {
  try {
    const profiles = await PatientProfileModel.find()
      .populate('patientId')
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

/* =========================
   GET SINGLE PROFILE
========================= */

export const getPatientProfileById = async (
  req: Request,
  res: Response,
) => {
  try {
    const profile = await PatientProfileModel.findById(req.params.id)
      .populate('patientId')

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: profile,
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

/* =========================
   GET PROFILE BY PATIENT ID
========================= */

import mongoose from 'mongoose'

export const getPatientProfileByPatientId = async (
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

    const profile = await PatientProfileModel.findOne({
      patientId: new mongoose.Types.ObjectId(patientId),
    }).populate('patientId')

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: profile,
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

/* =========================
   UPDATE PROFILE
========================= */

export const updatePatientProfile = async (
  req: Request,
  res: Response,
) => {
  try {
    const updatedProfile = await PatientProfileModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    ).populate('patientId')

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: updatedProfile,
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

/* =========================
   DELETE PROFILE
========================= */

export const deletePatientProfile = async (
  req: Request,
  res: Response,
) => {
  try {
    const deletedProfile = await PatientProfileModel.findByIdAndDelete(
      req.params.id,
    )

    if (!deletedProfile) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Patient profile deleted successfully',
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}