import { CalendarDays, Clock3 } from "lucide-react";
import { format } from "date-fns";

export default function AppointmentScheduleCard({ appointment }: any) {
  return (
    <div className="rounded-2xl bg-white border p-6 space-y-4">
      <h3 className="font-semibold flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-blue-600" />
        Appointment Schedule
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-xl border">
          <p className="text-xs text-muted-foreground">Date</p>
          <p className="font-medium">
            {format(new Date(appointment.startsAt), "PPP")}
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border">
          <p className="text-xs text-muted-foreground">Time</p>
          <p className="font-medium flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            {format(new Date(appointment.startsAt), "p")} -{" "}
            {format(new Date(appointment.endsAt), "p")}
          </p>
        </div>
      </div>
    </div>
  );
}