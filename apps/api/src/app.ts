import express from 'express'
import cors from 'cors'

import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth.js'

import authRoutes from './modules/auth/auth.routes.js'
import doctorRoutes from './modules/doctors/doctor.routes.js'
import appointmentRoutes from './modules/appointments/appointment.routes.js'
import patientRoutes from './modules/patients/patient.routes.js'
import userRoutes from './modules/users/user.routes.js'
import medicalRecordRoutes from './modules/medical-records/medical-record.routes.js'

import errorHandler from './middleware/error-handler.js'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'AskleMed API',
  })
})

app.use('/api/auth', authRoutes)

app.all('/api/auth/{*any}', async (req, res) => {
  return toNodeHandler(auth)(req, res)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/doctors', doctorRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/patients', patientRoutes)
app.use('/api/users', userRoutes)
app.use('/api/medical-records', medicalRecordRoutes)

app.use(errorHandler)

export default app
