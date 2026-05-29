import Header from "@/components/layout/header";

const ConsultationsPage = () => {
  return (
    <div className="space-y-8">
      <Header 
        title={"Consultations"}
        description={"View and manage consultations"}
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Consultations Page
      </div>
    </div>
  );
};

export default ConsultationsPage;