import Link from "next/link";
import {
  CalendarDays,
  FileText,
  Stethoscope,
} from "lucide-react";

export const QuickActions = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">
        Quick Actions
      </h3>

      <div className="mt-5 space-y-3">
        <Link
          href="/patient/doctors"
          className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50"
        >
          <span className="font-medium">
            Find Doctor
          </span>

          <Stethoscope className="h-5 w-5 text-slate-400" />
        </Link>

        <Link
          href="/patient/records"
          className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50"
        >
          <span className="font-medium">
            Medical Records
          </span>

          <FileText className="h-5 w-5 text-slate-400" />
        </Link>

        <Link
          href="/patient/appointments"
          className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50"
        >
          <span className="font-medium">
            Appointments
          </span>

          <CalendarDays className="h-5 w-5 text-slate-400" />
        </Link>
      </div>
    </div>
  );
};