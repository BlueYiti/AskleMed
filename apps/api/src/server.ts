// MUST BE FIRST
import './config/env.js'

import app from './app.js'
import { connectDB, disconnectDB } from './config/db.js'
import { env } from './config/env.js'

async function startServer() {
  try {
    await connectDB()

    const server = app.listen(env.PORT, () => {
      console.log(`API running on http://localhost:${env.PORT}`)
    })

    const gracefulShutdown = async () => {
      console.log('Shutting down server...')

      await disconnectDB()

      server.close(() => {
        process.exit(0)
      })
    }

    process.on('SIGINT', gracefulShutdown)
    process.on('SIGTERM', gracefulShutdown)
  } catch (error) {
    console.error('Server startup failed:', error)
    process.exit(1)
  }
}

startServer()