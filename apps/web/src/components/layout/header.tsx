import NotificationButton from "@/components/navigation/notification-button";

type DashboardHeaderProps = {
  title: string;
  description?: string;
};

const DashboardHeader = ({
  title,
  description = "Welcome back 👋",
}: DashboardHeaderProps) => {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="text-slate-500">
          {description}
        </p>
      </div>

      <NotificationButton />
    </header>
  );
};

export default DashboardHeader;