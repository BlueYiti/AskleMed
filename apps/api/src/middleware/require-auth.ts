import type { NextFunction, Request, Response } from 'express'
import { fromNodeHeaders } from 'better-auth/node'

import { auth } from '../lib/auth.js'

export default async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })

    if (!session) {
      return res.status(401).json({
        error: 'Unauthorized',
      })
    }

    req.user = session.user
    req.session = session.session

    next()
  } catch (error) {
    return res.status(401).json({
      error: 'Unauthorized',
    })
  }
}
