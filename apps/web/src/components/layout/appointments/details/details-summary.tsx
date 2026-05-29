import { CalendarDays, Clock3 } from "lucide-react";
import { format } from "date-fns";

export default function AppointmentSummary({ appointment }: any) {
  return (
    <div className="rounded-2xl bg-white border p-6 space-y-3">
      <h3 className="font-semibold">Appointment Details</h3>

      <div className="text-sm text-muted-foreground space-y-2">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          {format(new Date(appointment.startsAt), "PPP")}
        </div>

        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4" />
          {format(new Date(appointment.startsAt), "p")}
        </div>
      </div>
    </div>
  );
}