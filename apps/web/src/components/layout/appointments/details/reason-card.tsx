import { FileText } from "lucide-react";

export default function AppointmentReasonCard({ appointment }: any) {
  return (
    <div className="rounded-2xl bg-white border p-6 space-y-3">
      <h3 className="font-semibold flex items-center gap-2">
        <FileText className="h-5 w-5 text-blue-600" />
        Consultation Reason
      </h3>

      <div className="bg-slate-50 border rounded-xl p-4 text-sm text-muted-foreground">
        {appointment.reason || "No reason provided"}
      </div>
    </div>
  );
}