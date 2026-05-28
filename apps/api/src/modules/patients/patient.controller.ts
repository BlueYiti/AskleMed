import type { Request, Response } from 'express'
import { PatientModel } from './patient.model.js'
import { AppointmentModel } from '../appointments/appointment.model.js'
import { MedicalRecordModel } from '../medical-records/medical-record.model.js'

export async function listPatients(_req: Request, res: Response) {
  const patients = await PatientModel.find().select('name email phone dateOfBirth').lean()
  res.json(patients)
}

export async function getPatient(req: Request, res: Response) {
  const patient = await PatientModel.findById(req.params.id).select('name email phone dateOfBirth').lean()
  if (!patient) {
    return res.status(404).json({ error: 'Patient not found' })
  }
  res.json(patient)
}

export async function createPatient(req: Request, res: Response) {
  const { name, email, phone, dateOfBirth } = req.body
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' })
  }

  const patient = await PatientModel.create({ name, email, phone, dateOfBirth })
  res.status(201).json(patient)
}

export async function getPatientDashboard(
  req: Request,
  res: Response
) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const appointments = await AppointmentModel.find({
      patientEmail: user.email,
    }).sort({
      startsAt: 1,
    });

    const medicalRecordsCount =
      await MedicalRecordModel.countDocuments({
        patientEmail: user.email,
      });

    const uniqueDoctors = new Set(
      appointments.map((appointment) =>
        appointment.doctorEmail
      )
    );

    return res.status(200).json({
      appointments,

      medicalRecordsCount,

      doctorsCount: uniqueDoctors.size,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch dashboard",
    });
  }
}