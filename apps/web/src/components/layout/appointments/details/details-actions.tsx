import { Video, AlertCircle } from "lucide-react";

export default function AppointmentActions({ appointment }: any) {
  return (
    <div className="space-y-3">
      {appointment.meetingLink &&
        appointment.status === "confirmed" && (
          <a
            href={appointment.meetingLink}
            target="_blank"
            className="flex items-center justify-center gap-2 bg-blue-700 text-white rounded-xl py-3"
          >
            <Video className="h-4 w-4" />
            Join Call
          </a>
        )}

      {!["cancelled", "completed"].includes(appointment.status) && (
        <a
          href="https://app.cal.com/bookings/upcoming"
          target="_blank"
          className="flex items-center justify-center gap-2 bg-red-50 text-red-700 border border-red-200 rounded-xl py-3"
        >
          <AlertCircle className="h-4 w-4" />
          Cancel Appointment
        </a>
      )}
    </div>
  );
}