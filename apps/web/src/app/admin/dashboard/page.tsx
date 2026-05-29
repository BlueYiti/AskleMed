import Header from "@/components/layout/header";
import {
  CalendarDays,
  Stethoscope,
  Users,
  Activity,
  Bell,
  Clock3,
} from "lucide-react";

const stats = [
  {
    title: "Appointments Today",
    value: "128",
    change: "+12%",
    icon: CalendarDays,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Active Doctors",
    value: "42",
    change: "+4%",
    icon: Stethoscope,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Registered Users",
    value: "5,482",
    change: "+18%",
    icon: Users,
    color: "bg-violet-100 text-violet-600",
  },
  {
    title: "Pending Consultations",
    value: "17",
    change: "-2%",
    icon: Activity,
    color: "bg-orange-100 text-orange-600",
  },
];

const appointments = [
  {
    patient: "John Doe",
    doctor: "Dr. Santos",
    time: "09:30 AM",
    status: "Confirmed",
  },
  {
    patient: "Maria Cruz",
    doctor: "Dr. Reyes",
    time: "10:15 AM",
    status: "Pending",
  },
  {
    patient: "Kevin Tan",
    doctor: "Dr. Lim",
    time: "11:00 AM",
    status: "Completed",
  },
];

const notifications = [
  "12 appointments pending approval",
  "System maintenance tonight at 11 PM",
  "Dr. Santos is unavailable today",
];

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <Header
        title={"Dashboard"}
        description={"View your dashboard and key metrics"}
      />

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.title}</p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-800">
                    {stat.value}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-green-600">
                    {stat.change} this week
                  </p>
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.color}`}
                >
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Analytics Chart Placeholder */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Appointment Analytics
              </h2>
              <p className="text-sm text-slate-500">
                Weekly appointment overview
              </p>
            </div>

            <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              This Week
            </button>
          </div>

          {/* Fake chart */}
          <div className="flex h-72 items-end gap-4">
            {[40, 65, 30, 80, 55, 90, 70].map((height, index) => (
              <div key={index} className="flex-1">
                <div
                  className="rounded-t-2xl bg-blue-500"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Consultation Status */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">
            Consultation Status
          </h2>

          <div className="mt-8 space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Completed</span>
                <span>68%</span>
              </div>

              <div className="h-3 rounded-full bg-slate-100">
                <div className="h-3 w-[68%] rounded-full bg-green-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Pending</span>
                <span>22%</span>
              </div>

              <div className="h-3 rounded-full bg-slate-100">
                <div className="h-3 w-[22%] rounded-full bg-orange-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Cancelled</span>
                <span>10%</span>
              </div>

              <div className="h-3 rounded-full bg-slate-100">
                <div className="h-3 w-[10%] rounded-full bg-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Recent Appointments */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Recent Appointments
              </h2>

              <p className="text-sm text-slate-500">
                Latest patient bookings
              </p>
            </div>

            <button className="text-sm font-medium text-blue-600">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {appointments.map((appointment, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-2xl border border-slate-100 p-4"
              >
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {appointment.patient}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {appointment.doctor}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-slate-700">
                    {appointment.time}
                  </p>

                  <span className="mt-1 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">
              <Bell size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Notifications
              </h2>

              <p className="text-sm text-slate-500">
                Recent system alerts
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-2xl border border-slate-100 p-4"
              >
                <div className="mt-1 text-slate-400">
                  <Clock3 size={18} />
                </div>

                <p className="text-sm text-slate-700">{notification}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;