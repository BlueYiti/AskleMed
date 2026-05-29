import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import {
  CalendarDays,
  Clock3,
  HeartPulse,
  Video,
} from "lucide-react";

import type { Appointment } from "@/types/appointment";

interface Props {
  appointment: Appointment;
}

export function AppointmentCard({
  appointment,
}: Props) {

  console.log(
    "doctorPhotoUrl:",
    appointment.doctorPhotoUrl
  );

  const statusStyles: Record<
    Appointment["status"],
    string
  > = {
    confirmed:
      "bg-emerald-100 text-emerald-700",
    pending:
      "bg-amber-100 text-amber-700",
    cancelled:
      "bg-red-100 text-red-700",
    done: "bg-slate-200 text-slate-700",
  };

  return (
    <div
      className="
        group rounded-3xl border border-slate-200
        bg-white p-6 shadow-sm transition-all duration-300
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-lg
      "
    >
      <div className="flex flex-col gap-6">
        {/* TOP SECTION */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          {/* DOCTOR INFO */}
          <div className="flex items-start gap-4">
            {/* AVATAR */}
            <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              {appointment.doctorPhotoUrl ? (
                <Image
                  src={appointment.doctorPhotoUrl}
                  alt={appointment.doctorName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-blue-100 text-blue-600">
                  <HeartPulse className="h-7 w-7" />
                </div>
              )}
            </div>

            {/* DETAILS */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold text-slate-900">
                  {appointment.doctorName}
                </h2>

                <span
                  className={`
                    rounded-full px-3 py-1
                    text-xs font-semibold capitalize
                    ${
                      statusStyles[
                        appointment.status
                      ]
                    }
                  `}
                >
                  {appointment.status}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {appointment.doctorEmail}
              </p>

              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-6">
                {/* DATE */}
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />

                  {format(
                    new Date(appointment.startsAt),
                    "EEEE, MMMM d, yyyy"
                  )}
                </div>

                {/* TIME */}
                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4" />

                  {format(
                    new Date(appointment.startsAt),
                    "p"
                  )}{" "}
                  -{" "}
                  {format(
                    new Date(appointment.endsAt),
                    "p"
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-3">
            {appointment.meetingLink &&
              appointment.status ===
                "confirmed" && (
                <a
                  href={appointment.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-2
                    rounded-2xl bg-blue-600
                    px-4 py-2 text-sm font-medium
                    text-white transition
                    hover:bg-blue-700
                  "
                >
                  <Video className="h-4 w-4" />
                  Join Call
                </a>
              )}

            <Link
              href={`/patient/appointments/${appointment._id}`}
              className="
                rounded-2xl border border-slate-200
                bg-white px-4 py-2
                text-sm font-medium transition
                hover:bg-slate-50
              "
            >
              View Details
            </Link>
          </div>
        </div>

        {/* REASON */}
        {appointment.reason && (
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <p className="text-sm font-semibold text-slate-900">
              Reason for consultation
            </p>

            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {appointment.reason}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}