import Header from "@/components/layout/header";

const AnalyticsPage = () => {
  return (
    <div className="space-y-8">
      <Header 
        title={"Analytics"}
        description={"View analytics and reports"}
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Analytics Page
      </div>
    </div>
  );
};

export default AnalyticsPage;