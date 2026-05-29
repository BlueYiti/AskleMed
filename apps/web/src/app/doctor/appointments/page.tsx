import Header from "@/components/layout/header";

const AppointmentsPage = () => {
  return (
    <div className="space-y-8">
      <Header 
        title={"Appointments"}
        description={"Manage your appointments"}
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Appointments Page
      </div>
    </div>
  );
};

export default AppointmentsPage;