import Link from "next/link";
import { CalendarDays } from "lucide-react";

export const EmptyAppointments = () => {
  return (
    <div className="flex flex-col items-center py-14 text-center">
      <div className="rounded-full bg-blue-50 p-5">
        <CalendarDays className="h-10 w-10 text-blue-500" />
      </div>

      <h3 className="mt-6 text-xl font-bold text-slate-900">
        No upcoming appointments
      </h3>

      <p className="mt-2 max-w-sm text-sm text-slate-500">
        Schedule a consultation with a healthcare professional.
      </p>

      <Link
        href="/patient/doctors"
        className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Find Doctors
      </Link>
    </div>
  );
};