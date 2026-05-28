export type Appointment = {
  _id: string

  patientName: string
  patientEmail: string

  doctorName: string
  doctorEmail: string

  reason?: string

  startsAt: string
  endsAt: string

  status: string
}