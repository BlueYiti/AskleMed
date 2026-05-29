import express from 'express'

import {
  createPatientProfile,
  deletePatientProfile,
  getPatientProfileById,
  getPatientProfileByPatientId,
  getPatientProfiles,
  updatePatientProfile,
} from './patient-profile.controller.js'

const router = express.Router()

/* =========================
   PATIENT PROFILE ROUTES
========================= */

// CREATE
router.post('/', createPatientProfile)

// GET ALL
router.get('/', getPatientProfiles)

// GET BY PATIENT ID
router.get('/patient/:patientId', getPatientProfileByPatientId)

// GET SINGLE
router.get('/:id', getPatientProfileById)

// UPDATE
router.put('/:id', updatePatientProfile)

// DELETE
router.delete('/:id', deletePatientProfile)

export default router