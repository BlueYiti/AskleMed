import { Router } from 'express'
import { createMedicalRecord, getMedicalRecord, listMedicalRecords } from './medical-record.controller.js'

const router = Router()

router.get('/', listMedicalRecords)
router.get('/:id', getMedicalRecord)
router.post('/', createMedicalRecord)

export default router
