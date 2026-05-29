import Header from "@/components/layout/header";

const ConsultationPage = () => {
  return (
    <div className="space-y-8">
      <Header
        title={"Consultation"}
        description={"View your consultation history, prescriptions, and medical documents"}
      />

      {/* Consultation Container */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Top Banner */}
        <div className="border-b border-slate-100 px-8 py-6 flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
                🩺
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Consultation with Dr. Maria Sangria
                </h2>

                <p className="text-sm text-slate-500">
                  May 29, 2026 • 2:00 PM • Video Consultation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pl-15">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                Completed
              </span>

              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                General Medicine
              </span>
            </div>
          </div>

          <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
            Book Follow-up
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 p-8 space-y-8 border-r border-slate-100">
            {/* Patient Summary */}
            <section className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Consultation Summary
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Patient-friendly overview of your visit
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Symptoms
                  </p>

                  <p className="text-slate-600 mt-1">
                    Fever, sore throat, mild cough, and fatigue for the past 3 days.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Diagnosis
                  </p>

                  <p className="text-slate-600 mt-1">
                    Upper respiratory tract infection.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Treatment Plan
                  </p>

                  <p className="text-slate-600 mt-1">
                    Continue hydration, rest, and prescribed medications for 7 days.
                    Return if symptoms worsen or breathing becomes difficult.
                  </p>
                </div>
              </div>
            </section>

            {/* Doctor Notes */}
            <section className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Doctor Notes
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Clinical notes recorded during your consultation
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-slate-600 leading-relaxed text-sm">
                  Patient reports sore throat, intermittent fever, and fatigue.
                  No shortness of breath or chest pain reported. Likely viral URI.
                  Advised supportive care and prescribed symptomatic medication.
                </p>
              </div>
            </section>

            {/* Attachments */}
            <section className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Medical Documents
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Prescriptions, certificates, and lab requests from this consultation
                </p>
              </div>

              <div className="grid gap-4">
                {/* Prescription */}
                <div className="rounded-2xl border border-slate-200 p-5 flex items-center justify-between hover:bg-slate-50 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                      💊
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-800">
                        Prescription
                      </h4>

                      <p className="text-sm text-slate-500">
                        Issued May 29, 2026
                      </p>
                    </div>
                  </div>

                  <button className="text-sm font-medium text-slate-700 hover:text-slate-900">
                    View PDF
                  </button>
                </div>

                {/* Medical Certificate */}
                <div className="rounded-2xl border border-slate-200 p-5 flex items-center justify-between hover:bg-slate-50 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-xl">
                      📄
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-800">
                        Medical Certificate
                      </h4>

                      <p className="text-sm text-slate-500">
                        Fit-to-work certificate
                      </p>
                    </div>
                  </div>

                  <button className="text-sm font-medium text-slate-700 hover:text-slate-900">
                    Download
                  </button>
                </div>

                {/* Lab Request */}
                <div className="rounded-2xl border border-slate-200 p-5 flex items-center justify-between hover:bg-slate-50 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-xl">
                      🧪
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-800">
                        Lab Request
                      </h4>

                      <p className="text-sm text-slate-500">
                        Complete Blood Count (CBC)
                      </p>
                    </div>
                  </div>

                  <button className="text-sm font-medium text-slate-700 hover:text-slate-900">
                    View Request
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="p-8 space-y-6 bg-slate-50/50">
            {/* Doctor Card */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-200" />

                <div>
                  <h4 className="font-semibold text-slate-800">
                    Dr. Maria Sangria
                  </h4>

                  <p className="text-sm text-slate-500">
                    General Medicine
                  </p>
                </div>
              </div>

              <button className="w-full rounded-xl bg-slate-900 text-white py-3 text-sm font-medium hover:bg-slate-800 transition">
                Message Doctor
              </button>
            </div>

            {/* Timeline */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5">
              <h4 className="font-semibold text-slate-800 mb-5">
                Consultation Timeline
              </h4>

              <div className="space-y-5">
                <div className="flex gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500" />

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Appointment Confirmed
                    </p>

                    <p className="text-xs text-slate-500">
                      May 28, 2026 • 5:30 PM
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-500" />

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Consultation Started
                    </p>

                    <p className="text-xs text-slate-500">
                      May 29, 2026 • 2:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-purple-500" />

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Prescription Issued
                    </p>

                    <p className="text-xs text-slate-500">
                      May 29, 2026 • 2:25 PM
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-orange-500" />

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Consultation Completed
                    </p>

                    <p className="text-xs text-slate-500">
                      May 29, 2026 • 2:30 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow Up */}
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5">
              <h4 className="font-semibold text-amber-900">
                Follow-up Reminder
              </h4>

              <p className="text-sm text-amber-700 mt-2 leading-relaxed">
                Schedule another consultation if symptoms persist after 7 days
                or if your condition worsens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;