import {
  CalendarDays,
  Clock3,
  FileText,
  HeartPulse,
  Stethoscope,
  Video,
} from "lucide-react";

import Header from "@/components/layout/header";

const stats = [
  {
    title: "Upcoming Appointments",
    value: "3",
    icon: CalendarDays,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Consultations",
    value: "12",
    icon: Video,
    color: "bg-violet-100 text-violet-600",
  },
  {
    title: "Medical Records",
    value: "8",
    icon: FileText,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Doctors",
    value: "5",
    icon: Stethoscope,
    color: "bg-rose-100 text-rose-600",
  },
];

const upcomingAppointments = [
  {
    doctor: "Dr. Sarah Williams",
    specialty: "Cardiologist",
    date: "May 29, 2026",
    time: "10:00 AM",
  },
  {
    doctor: "Dr. Michael Reyes",
    specialty: "Dermatologist",
    date: "June 1, 2026",
    time: "2:30 PM",
  },
];

const recentActivities = [
  "Uploaded blood test results",
  "Completed consultation with Dr. Sarah Williams",
  "Booked a new appointment",
  "Updated medical profile",
];

const PatientDashboardPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Header
        title={"Dashboard"}
        description={"Welcome back 👋"}
      />

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
                >
                  <Icon className="h-7 w-7" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Upcoming Appointments
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your scheduled consultations.
                </p>
              </div>

              <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                Book Appointment
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={`${appointment.doctor}-${appointment.time}`}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-5 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                      <HeartPulse className="h-6 w-6" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {appointment.doctor}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {appointment.specialty}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      {appointment.date}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4" />
                      {appointment.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm">
            <h2 className="text-xl font-bold">
              Need Immediate Help?
            </h2>

            <p className="mt-2 text-sm text-slate-300">
              Start an instant consultation with an available doctor.
            </p>

            <button className="mt-5 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
              Start Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboardPage;
