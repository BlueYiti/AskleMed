export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Appointment {
  _id: string;

  patientName: string;
  patientEmail: string;

  doctorName: string;
  doctorEmail: string;

  startsAt: string;
  endsAt: string;

  status: "pending" | "confirmed" | "completed" | "cancelled";

  meetingLink?: string;
}

export interface DashboardData {
  appointments: Appointment[];
  medicalRecordsCount: number;
  doctorsCount: number;
}

export interface DashboardStat {
  title: string;
  value: number;
  gradient: string;
  icon: any;
}