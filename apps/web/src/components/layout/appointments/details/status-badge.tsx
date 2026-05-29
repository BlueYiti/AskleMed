const statusStyles: Record<string, string> = {
  confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
  completed: "bg-slate-200 text-slate-700 border-slate-300",
};

export default function AppointmentStatusBadge({ status }: any) {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <p className="text-sm text-muted-foreground mb-2">
        Appointment Status
      </p>

      <span
        className={`inline-flex px-3 py-1 text-xs rounded-full border font-medium ${
          statusStyles[status]
        }`}
      >
        {status}
      </span>
    </div>
  );
}