import Image from "next/image";
import { Mail, HeartPulse } from "lucide-react";

export default function AppointmentDoctorCard({ appointment }: any) {
  return (
    <div className="rounded-2xl bg-white border p-6 flex gap-4">
      <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-slate-100 border">
        {appointment.doctorPhotoUrl ? (
          <Image
            src={appointment.doctorPhotoUrl}
            alt={appointment.doctorName}
            fill
            className="object-cover"
          />
        ) : (
          <HeartPulse className="h-full w-full p-3 text-blue-600" />
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold">
          {appointment.doctorName}
        </h2>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          {appointment.doctorEmail}
        </div>

        <p className="text-sm text-muted-foreground mt-1">
          Licensed Healthcare Professional
        </p>
      </div>
    </div>
  );
}