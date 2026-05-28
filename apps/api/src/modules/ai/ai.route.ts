import { Router } from 'express'

import {
  recommendDoctors
} from './ai.controller.js'

const router = Router()

router.post(
  '/recommend-doctors',
  recommendDoctors
)

export default router