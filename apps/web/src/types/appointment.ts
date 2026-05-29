export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'done'

export interface Appointment {
  _id: string

  patientName: string
  patientEmail: string

  doctorId?: string
  doctorName: string
  doctorEmail: string
  doctorPhotoUrl?: string | null

  reason?: string

  startsAt: string
  endsAt: string

  status: AppointmentStatus

  meetingLink?: string

  createdAt?: string
  updatedAt?: string
}