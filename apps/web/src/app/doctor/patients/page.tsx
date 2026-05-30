"use client";

import Link from "next/link";

import Header from "@/components/layout/header";

const mockPatients = [
  {
    _id: "PAT-001",
    name: "Juan Dela Cruz",
    age: 29,
    gender: "Male",
    consultations: 5,
    lastVisit: "May 15, 2026",
    condition: "Upper Respiratory Infection",
  },
  {
    _id: "PAT-002",
    name: "Maria Reyes",
    age: 45,
    gender: "Female",
    consultations: 12,
    lastVisit: "May 14, 2026",
    condition: "Hypertension",
  },
  {
    _id: "PAT-003",
    name: "Jose Santos",
    age: 37,
    gender: "Male",
    consultations: 3,
    lastVisit: "May 10, 2026",
    condition: "Dermatitis",
  },
  {
    _id: "PAT-004",
    name: "Angela Cruz",
    age: 52,
    gender: "Female",
    consultations: 8,
    lastVisit: "May 8, 2026",
    condition: "Diabetes",
  },
];

const PatientsPage = () => {
  return (
    <div className="space-y-8">
      <Header
        title="Patients"
        description="Manage your patients and review their medical history."
      />

      {/* Stats */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Patients</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {mockPatients.length}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Active This Month</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">18</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Consultations Completed</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {mockPatients.reduce(
              (sum, patient) => sum + patient.consultations,
              0
            )}
          </p>
        </div>
      </section>

      {/* Patient Directory */}
      <section className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Patient Directory
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Browse and manage all patients under your care.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search patients..."
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 lg:max-w-sm"
          />
        </div>

        <div className="space-y-5">
          {mockPatients.map((patient) => (
            <Link
              key={patient._id}
              href={`/doctor/patients/${patient._id}`}
              className="block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                {/* LEFT */}
                <div className="flex-1 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                      👤
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        {patient.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {patient.age} years old • {patient.gender}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Last Visit
                      </p>

                      <p className="mt-1 font-medium text-slate-800">
                        {patient.lastVisit}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Consultations
                      </p>

                      <p className="mt-1 font-medium text-slate-800">
                        {patient.consultations}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Latest Condition
                      </p>

                      <p className="mt-1 font-medium text-slate-800">
                        {patient.condition}
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-start gap-4 lg:items-end">
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Patient ID
                    </p>

                    <p className="mt-1 font-mono text-sm text-slate-600">
                      #{patient._id.slice(-6)}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white">
                    View Patient
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

export default PatientsPage;