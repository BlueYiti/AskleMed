import Header from "@/components/layout/header";

const DoctorDashboardPage = () => {
  return (
    <div className="space-y-8">
      <Header 
        title={"Dashboard"}
        description={"Welcome back 👋"}
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Dashboard Content Here
      </div>
    </div>
  );
};

export default DoctorDashboardPage;