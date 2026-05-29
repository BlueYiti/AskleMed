import Header from "@/components/layout/header";

const ReportsPage = () => {
  return (
    <div className="space-y-8">
      <Header 
        title={"Reports"}
        description={"View and generate reports"}
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Reports Page
      </div>
    </div>
  );
};

export default ReportsPage;