import Header from "@/components/layout/header";

const SchedulePage = () => {
  return (
    <div className="space-y-8">
      <Header 
        title={"Schedule"}
        description={"Manage your schedule and availability"}
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Schedule Page
      </div>
    </div>
  );
};

export default SchedulePage;