import { Router } from 'express'
import { createPatient, getPatient, listPatients } from './patient.controller.js'

const router = Router()

router.get('/', listPatients)
router.get('/:id', getPatient)
router.post('/', createPatient)

export default router
