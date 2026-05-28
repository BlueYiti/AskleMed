import Header from "@/components/layout/header";

const ConsultationPage = () => {
  return (
    <div className="space-y-8">
      <Header
        title={"Consultation"}
        description={"Start your consultation with your doctor"}
      />

      {/* Content */}
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4 max-w-md">
          <div className="mx-auto w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
            <span className="text-2xl">🩺</span>
          </div>

          <h2 className="text-xl font-semibold text-slate-800">
            No consultation started yet
          </h2>

          <p className="text-slate-600">
            Please go to the{" "}
            <span className="font-semibold text-slate-800">Doctors</span> tab
            to schedule an appointment before starting a consultation.
          </p>

          <p className="text-sm text-slate-500">
            Once your appointment is confirmed, your consultation will appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;