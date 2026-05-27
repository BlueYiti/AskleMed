import Header from "@/components/patient/dashboard-header";

const AppointmentsPage = () => {
  return (
    <div className="p-8">
      <Header 
        title={"Appointments"}
        description={"Manage your appointments"}
      />

      <div className="mt-8">
        Appointments Page
      </div>
    </div>
  );
};

export default AppointmentsPage;