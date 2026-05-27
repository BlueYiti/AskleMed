import { Router } from 'express'
import { createDoctor, getDoctor, listDoctors } from './doctor.controller.js'

const router = Router()

router.get('/', listDoctors)
router.get('/:id', getDoctor)
router.post('/', createDoctor)

export default router
