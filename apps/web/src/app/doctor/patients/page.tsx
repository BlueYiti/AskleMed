import Header from "@/components/layout/header";
import AppointmentsPage from "../appointments/page";

const PatientsPage = () => {
  return (
    <div className="p-8">
      <Header 
        title={"Patients"}
        description={"Manage your patients"}
      />

      <div className="mt-8">
        Patients Page
      </div>
    </div>
  );
};

export default PatientsPage;