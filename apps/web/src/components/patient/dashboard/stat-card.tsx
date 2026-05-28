import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: number;
  gradient: string;
  icon: LucideIcon;
  loading?: boolean;
}

export const DashboardStatCard = ({
  title,
  value,
  gradient,
  icon: Icon,
  loading,
}: Props) => {
  return (
    <div
      className="
        group rounded-3xl border border-slate-200/70 bg-white p-6
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {loading ? "-" : value}
          </h2>
        </div>

        <div
          className={`
            flex h-14 w-14 items-center justify-center rounded-2xl
            bg-gradient-to-br ${gradient}
            text-white shadow-lg
          `}
        >
          <Icon className="h-7 w-7" />
        </div>
      </div>
    </div>
  );
};