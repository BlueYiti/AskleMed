import Header from "@/components/layout/header";

const DoctorsPage = () => {
  return (
    <div className="space-y-8">
      <Header 
        title={"Doctors"}
        description={"View and manage doctors"}
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Doctors Page
      </div>
    </div>
  );
};

export default DoctorsPage;