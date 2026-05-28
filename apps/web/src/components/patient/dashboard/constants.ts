import {
  CalendarDays,
  FileText,
  Stethoscope,
  Video,
} from "lucide-react";

/**
 * Gradient system used across dashboard stat cards
 * Keep this centralized so UI stays consistent
 */
export const dashboardGradients = {
  appointments: "from-blue-500 to-cyan-500",
  consultations: "from-violet-500 to-fuchsia-500",
  records: "from-emerald-500 to-teal-500",
  doctors: "from-rose-500 to-orange-500",
} as const;

/**
 * Icon registry for dashboard stat cards
 * Avoid importing icons directly inside page logic
 */
export const dashboardIcons = {
  appointments: CalendarDays,
  consultations: Video,
  records: FileText,
  doctors: Stethoscope,
} as const;

/**
 * Stat keys used internally to avoid magic strings
 * Useful if you later extend analytics or caching
 */
export type DashboardStatKey =
  | "appointments"
  | "consultations"
  | "records"
  | "doctors";

/**
 * Optional: full stat configuration blueprint
 * (useful if you later move stats fully out of page.tsx)
 */
export const dashboardStatMeta: Record<
  DashboardStatKey,
  {
    label: string;
    gradient: string;
    icon: any;
  }
> = {
  appointments: {
    label: "Upcoming Appointments",
    gradient: dashboardGradients.appointments,
    icon: dashboardIcons.appointments,
  },
  consultations: {
    label: "Consultations",
    gradient: dashboardGradients.consultations,
    icon: dashboardIcons.consultations,
  },
  records: {
    label: "Medical Records",
    gradient: dashboardGradients.records,
    icon: dashboardIcons.records,
  },
  doctors: {
    label: "Doctors",
    gradient: dashboardGradients.doctors,
    icon: dashboardIcons.doctors,
  },
};