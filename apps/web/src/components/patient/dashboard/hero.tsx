import Link from "next/link";

interface Props {
  name?: string;
}

export const DashboardHero = ({ name }: Props) => {
  return (
    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 p-8 text-white shadow-lg">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-100">
            Welcome back 👋
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {name ?? "Patient"}
          </h1>

          <p className="mt-3 max-w-xl text-sm text-blue-100">
            Manage appointments, prescriptions, and healthcare records in one place.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/patient/doctors"
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.02]"
          >
            Book Appointment
          </Link>

          <Link
            href="/patient/appointments"
            className="rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
          >
            View Schedule
          </Link>
        </div>
      </div>
    </div>
  );
};