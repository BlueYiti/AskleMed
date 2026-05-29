import Header from "@/components/layout/header";

const NotificationsPage = () => {
  return (
    <div className="space-y-8">
      <Header 
        title={"Notifications"}
        description={"System-Wide Broadcast Notifications"}
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Notifications Page
      </div>
    </div>
  );
};

export default NotificationsPage;