import express, { Router } from 'express'

import { login, me, register } from './auth.controller.js'

const router = Router()
const parseBody = [
  express.json(),
  express.urlencoded({ extended: true }),
]

router.post('/register', parseBody, register)
router.post('/login', parseBody, login)
router.get('/me', me)

export default router
