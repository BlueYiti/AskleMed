import Header from "@/components/layout/header";

const LogsPage = () => {
  return (
    <div className="space-y-8">
      <Header 
        title={"Logs"}
        description={"View system logs and monitor application activity"}
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Logs Page
      </div>
    </div>
  );
};

export default LogsPage;