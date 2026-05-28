import { format } from 'date-fns'
import type { Appointment } from '@/types/appointment'

interface Props {
  appointment: Appointment
}

export function AppointmentCard({ appointment }: Props) {
  return (
    <div className="border rounded-2xl p-5 hover:border-primary/40 transition">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-semibold text-lg">{appointment.doctorName}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {format(new Date(appointment.startsAt), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-muted capitalize w-fit">
          {appointment.status}
        </span>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 text-sm">
        <div className="space-y-1">
          <p className="font-medium">Starts</p>
          <p className="text-muted-foreground">
            {format(new Date(appointment.startsAt), 'p')}
          </p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Ends</p>
          <p className="text-muted-foreground">
            {format(new Date(appointment.endsAt), 'p')}
          </p>
        </div>
      </div>

      {appointment.reason && (
        <div className="mt-4 border-t pt-4">
          <p className="text-sm font-medium mb-1">Reason for consultation</p>
          <p className="text-sm text-muted-foreground">{appointment.reason}</p>
        </div>
      )}
    </div>
  )
}