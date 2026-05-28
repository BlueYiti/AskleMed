import { DashboardStatCard } from "./stat-card";
import { DashboardStat } from "@/types/dashboard";

interface Props {
  stats: DashboardStat[];
  loading?: boolean;
}

export const DashboardStats = ({
  stats,
  loading,
}: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <DashboardStatCard
          key={item.title}
          title={item.title}
          value={item.value}
          gradient={item.gradient}
          icon={item.icon}
          loading={loading}
        />
      ))}
    </div>
  );
};