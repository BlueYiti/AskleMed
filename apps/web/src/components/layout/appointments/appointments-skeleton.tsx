export const AppointmentsSkeleton = () => {
  return (
    <div className="mt-6 space-y-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-200 p-5"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="h-4 w-40 rounded bg-slate-200" />
              <div className="h-3 w-24 rounded bg-slate-100" />
            </div>

            <div className="h-10 w-24 rounded-xl bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
};