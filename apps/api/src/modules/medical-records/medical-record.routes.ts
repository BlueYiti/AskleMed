import express from 'express'

import {
  createMedicalRecord,
  deleteMedicalRecord,
  getMedicalRecordById,
  getMedicalRecords,
  getMedicalRecordsByPatient,
  updateMedicalRecord,
} from './medical-record.controller.js'

const router = express.Router()

/* =========================
   MEDICAL RECORD ROUTES
========================= */

// CREATE
router.post('/', createMedicalRecord)

// GET ALL
router.get('/', getMedicalRecords)

// GET BY PATIENT
router.get('/patient/:patientId', getMedicalRecordsByPatient)

// GET SINGLE
router.get('/:id', getMedicalRecordById)

// UPDATE
router.put('/:id', updateMedicalRecord)

// DELETE
router.delete('/:id', deleteMedicalRecord)

export default router