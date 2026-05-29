import Header from "@/components/layout/header";

const ConsultationPage = () => {
  return (
    <div className="space-y-8">
      <Header 
        title={"Consultation"}
        description={"View consultation details and reports"}
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Consultation Page
      </div>
    </div>
  );
};

export default ConsultationPage;