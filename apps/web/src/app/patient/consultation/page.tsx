import Link from "next/link";
import Header from "@/components/layout/header";

const consultations = [
  {
    id: "1",
    doctor: "Dr. Maria Santos",
    specialty: "General Medicine",
    date: "May 29, 2026",
    time: "2:00 PM",
    status: "Completed",
    diagnosis: "Upper respiratory tract infection",
    hasPrescription: true,
    hasCertificate: true,
    hasLabRequest: true,
  },
  {
    id: "2",
    doctor: "Dr. James Cruz",
    specialty: "Dermatology",
    date: "May 18, 2026",
    time: "10:30 AM",
    status: "Completed",
    diagnosis: "Mild eczema flare-up",
    hasPrescription: true,
    hasCertificate: false,
    hasLabRequest: false,
  },
  {
    id: "3",
    doctor: "Dr. Angela Reyes",
    specialty: "Cardiology",
    date: "June 2, 2026",
    time: "9:00 AM",
    status: "Upcoming",
    diagnosis: "Follow-up consultation",
    hasPrescription: false,
    hasCertificate: false,
    hasLabRequest: false,
  },
];

const ConsultationPage = () => {
  return (
    <div className="space-y-8">
      <Header
        title={"Consultations"}
        description={
          "View your appointments, prescriptions, certificates, and medical history"
        }
      />

      {/* Upcoming Consultation */}
      <section className="rounded-3xl border border-slate-200 bg-linear-to-br from-slate-900 to-slate-800 p-8 text-white shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Upcoming Consultation
            </div>

            <div>
              <h2 className="text-2xl font-semibold">
                Dr. Angela Reyes
              </h2>

              <p className="text-slate-300 mt-1">
                Cardiology • June 2, 2026 • 9:00 AM
              </p>
            </div>

            <p className="max-w-2xl text-slate-300 leading-relaxed">
              Follow-up consultation regarding blood pressure monitoring
              and medication adjustments.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-100 transition">
              Join Consultation
            </button>

            <button className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-medium text-white hover:bg-white/10 transition">
              Reschedule
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CONSULTATIONS */}
      {/* ========================================================= */}
      <section className="space-y-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Consultation History
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Browse your previous and upcoming consultations
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <button className="rounded-full bg-slate-900 text-white px-4 py-2 text-sm font-medium">
              All
            </button>

            <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Upcoming
            </button>

            <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Completed
            </button>

            <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Cancelled
            </button>
          </div>
        </div>

        {/* Consultation Cards */}
        <div className="space-y-5">
          {consultations.map((consultation) => (
            <Link
              key={consultation.id}
              href={`/patient/consultation/${consultation.id}`}
              className="block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300 hover:shadow-md transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* LEFT */}
                <div className="space-y-5 flex-1">
                  {/* Doctor Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
                      🩺
                    </div>

                    <div className="space-y-2">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800">
                          {consultation.doctor}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {consultation.specialty}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-slate-500">
                          {consultation.date} • {consultation.time}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            consultation.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {consultation.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-700">
                      Consultation Summary
                    </p>

                    <p className="text-slate-600 mt-1 leading-relaxed">
                      {consultation.diagnosis}
                    </p>
                  </div>

                  {/* Documents */}
                  <div className="flex flex-wrap gap-3">
                    {consultation.hasPrescription && (
                      <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                        💊 Prescription
                      </div>
                    )}

                    {consultation.hasCertificate && (
                      <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                        📄 Certificate
                      </div>
                    )}

                    {consultation.hasLabRequest && (
                      <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                        🧪 Lab Request
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-start lg:items-end gap-4">
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Consultation ID
                    </p>

                    <p className="mt-1 font-mono text-sm text-slate-600">
                      #{consultation.id}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white">
                    View Consultation
                    <span>→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ConsultationPage;