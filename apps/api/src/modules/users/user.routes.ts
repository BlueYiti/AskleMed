import { Router } from 'express'

import {
  listUsers,
  getUser,
  updateUser,
  deleteUser,
} from './user.controller.js'

import requireAuth from '../../middleware/require-auth.js'

const router = Router()

router.get(
  '/',
  requireAuth,
  listUsers
)

router.get(
  '/:id',
  requireAuth,
  getUser
)

router.patch(
  '/:id',
  requireAuth,
  updateUser
)

router.delete(
  '/:id',
  requireAuth,
  deleteUser
)

export default router