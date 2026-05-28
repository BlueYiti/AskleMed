import Header from "@/components/layout/header";

const AppointmentsPage = () => {
  return (
    <div className="p-8">
      <Header 
        title={"Appointments"}
        description={"View and manage appointments"}
      />

      <div className="mt-8">
        Appointments Page
      </div>
    </div>
  );
};

export default AppointmentsPage;