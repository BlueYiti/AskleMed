import Link from "next/link";

import { Appointment } from "@/types/appointment";
import { AppointmentCard } from "../../layout/appointments/appointment-card";
import { EmptyAppointments } from "./empty-appointments";
import { AppointmentsSkeleton } from "../../layout/appointments/appointments-skeleton";

interface Props {
  appointments: Appointment[];
  loading?: boolean;
}

export const UpcomingAppointments = ({
  appointments,
  loading,
}: Props) => {
  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Upcoming Appointments
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your scheduled consultations.
          </p>
        </div>

        <Link
          href="/patient/doctors"
          className="w-fit rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Book Appointment
        </Link>
      </div>

      {loading && <AppointmentsSkeleton />}

      {!loading && appointments.length === 0 && (
        <EmptyAppointments />
      )}

      {!loading && appointments.length > 0 && (
        <div className="mt-6 space-y-4">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
            />
          ))}
        </div>
      )}
    </div>
  );
};