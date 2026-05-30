"use client";

import Link from "next/link";
import { format } from "date-fns";

import Header from "@/components/layout/header";
import { useConsultations } from "@/hooks/use-consultations";

const mockConsultations = [
  {
    _id: "CONS-001",
    doctor: {
      name: "Dr. Maria Santos",
      specialty: "General Medicine",
    },
    schedule: {
      startsAt: "2026-05-15T09:30:00.000Z",
    },
    diagnosis:
      "Upper respiratory tract infection. Advised hydration, rest, and prescribed antibiotics for 7 days.",
    documents: {
      hasPrescription: true,
      hasCertificate: false,
      hasLabRequest: false,
    },
  },
  {
    _id: "CONS-002",
    doctor: {
      name: "Dr. John Cruz",
      specialty: "Cardiology",
    },
    schedule: {
      startsAt: "2026-04-28T14:00:00.000Z",
    },
    diagnosis:
      "Mild hypertension. Recommended lifestyle modifications and blood pressure monitoring.",
    documents: {
      hasPrescription: true,
      hasCertificate: false,
      hasLabRequest: true,
    },
  },
  {
    _id: "CONS-003",
    doctor: {
      name: "Dr. Angela Reyes",
      specialty: "Dermatology",
    },
    schedule: {
      startsAt: "2026-03-12T10:15:00.000Z",
    },
    diagnosis:
      "Atopic dermatitis flare-up. Prescribed topical corticosteroid and moisturizer regimen.",
    documents: {
      hasPrescription: true,
      hasCertificate: false,
      hasLabRequest: false,
    },
  },
  {
    _id: "CONS-004",
    doctor: {
      name: "Dr. Michael Tan",
      specialty: "Internal Medicine",
    },
    schedule: {
      startsAt: "2026-02-20T08:00:00.000Z",
    },
    diagnosis:
      "Routine annual checkup. Laboratory work requested for cholesterol and glucose screening.",
    documents: {
      hasPrescription: false,
      hasCertificate: true,
      hasLabRequest: true,
    },
  },
  {
    _id: "CONS-005",
    doctor: {
      name: "Dr. Sophia Lim",
      specialty: "Pediatrics",
    },
    schedule: {
      startsAt: "2026-01-10T13:45:00.000Z",
    },
    diagnosis:
      "Seasonal viral infection. Symptomatic treatment advised with follow-up if symptoms persist.",
    documents: {
      hasPrescription: false,
      hasCertificate: true,
      hasLabRequest: false,
    },
  },
];

const USE_MOCK_DATA = true;

const ConsultationPage = () => {
  const { consultations, loading } = useConsultations();

  const displayConsultations = USE_MOCK_DATA
    ? mockConsultations
    : consultations;

  return (
    <div className="space-y-8">
      <Header
        title="Consultations"
        description="View your completed consultations, prescriptions, certificates, and medical history."
      />

      {/* Stats */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Consultations</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {displayConsultations.length}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Prescriptions</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {
              displayConsultations.filter(
                (c) => c.documents?.hasPrescription
              ).length
            }
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Certificates</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {
              displayConsultations.filter(
                (c) => c.documents?.hasCertificate
              ).length
            }
          </p>
        </div>
      </section>

      {/* History */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Consultation History
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Browse all completed consultations and attached medical documents.
          </p>
        </div>

        {loading && !USE_MOCK_DATA ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-slate-500">Loading consultations...</p>
          </div>
        ) : displayConsultations.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
            <p className="font-medium text-slate-700">
              No consultations found
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Completed consultations will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {displayConsultations.map((consultation) => (
              <Link
                key={consultation._id}
                href={`/patient/consultation/${consultation._id}`}
                className="block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  {/* LEFT */}
                  <div className="flex-1 space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                        🩺
                      </div>

                      <div className="space-y-2">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">
                            {consultation.doctor.name}
                          </h3>

                          <p className="text-sm text-slate-500">
                            {consultation.doctor.specialty}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm text-slate-500">
                            {format(
                              new Date(consultation.schedule.startsAt),
                              "MMMM d, yyyy • h:mm a"
                            )}
                          </span>

                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                            Completed
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm font-medium text-slate-700">
                        Consultation Summary
                      </p>

                      <p className="mt-1 leading-relaxed text-slate-600">
                        {consultation.diagnosis ||
                          "No diagnosis recorded."}
                      </p>
                    </div>

                    {/* Documents */}
                    <div className="flex flex-wrap gap-3">
                      {consultation.documents?.hasPrescription && (
                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                          💊 Prescription
                        </div>
                      )}

                      {consultation.documents?.hasCertificate && (
                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                          📄 Certificate
                        </div>
                      )}

                      {consultation.documents?.hasLabRequest && (
                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                          🧪 Lab Request
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col items-start gap-4 lg:items-end">
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Consultation ID
                      </p>

                      <p className="mt-1 font-mono text-sm text-slate-600">
                        #{consultation._id.slice(-6)}
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
        )}
      </section>
    </div>
  );
};

export default ConsultationPage;