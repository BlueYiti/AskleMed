import TimeBox from "./time-box";
import { useAppointmentCountdown } from "@/hooks/use-appointment-countdown";

export default function AppointmentCountdown({ appointment }: any) {
  const timeLeft = useAppointmentCountdown(appointment.startsAt);

  return (
    <div className="rounded-2xl bg-linear-to-br from-blue-600 to-blue-700 text-white p-5 space-y-3">
      <p className="text-sm text-blue-100">
        Time Until Appointment
      </p>

      {timeLeft.expired ? (
        <p className="text-lg font-semibold">
          Session Started
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          <TimeBox label="Days" value={timeLeft.days} />
          <TimeBox label="Hours" value={timeLeft.hours} />
          <TimeBox label="Minutes" value={timeLeft.minutes} />
          <TimeBox label="Seconds" value={timeLeft.seconds} />
        </div>
      )}
    </div>
  );
}