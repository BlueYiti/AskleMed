import Header from "@/components/patient/dashboard-header";

const PatientDashboardPage = () => {
  return (
    <div className="p-8">
      <Header 
        title={"Dashboard"}
        description={"Welcome back 👋"}
      />

      <div className="mt-8">
        Dashboard Content Here
      </div>
    </div>
  );
};

export default PatientDashboardPage;