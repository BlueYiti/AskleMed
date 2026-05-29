import Header from "@/components/layout/header";

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <Header 
        title={"Dashboard"}
        description={"View your dashboard and key metrics"}
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Dashboard Page
      </div>
    </div>
  );
};

export default DashboardPage;