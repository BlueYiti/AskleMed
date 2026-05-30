"use client";

import Header from "@/components/layout/header";
import { FileText, Pill, Download, Eye } from "lucide-react";
import { jsPDF } from "jspdf";

const records = [
  {
    id: 1,
    date: "March 12, 2025",
    doctor: "Dr. Maria Santos",
    specialty: "General Medicine",
    diagnosis: "Acute Upper Respiratory Tract Infection",
    prescription: [
      "Paracetamol 500mg - Take every 6 hours as needed",
      "Cetirizine 10mg - Once daily for 7 days",
    ],
  },
  {
    id: 2,
    date: "January 28, 2025",
    doctor: "Dr. John Cruz",
    specialty: "Dermatology",
    diagnosis: "Contact Dermatitis",
    prescription: [
      "Hydrocortisone Cream - Apply twice daily",
      "Loratadine 10mg - Once daily",
    ],
  },
  {
    id: 3,
    date: "November 10, 2024",
    doctor: "Dr. Angela Reyes",
    specialty: "Family Medicine",
    diagnosis: "Hypertension Follow-up",
    prescription: [
      "Amlodipine 5mg - Once daily",
      "Lifestyle modifications advised",
    ],
  },
];

const downloadBlankPdf = (recordId: number) => {
  const pdf = new jsPDF();

  // Optional blank page title
  pdf.setFontSize(18);
  pdf.text("Medical Record", 20, 20);

  // Save file
  pdf.save(`medical-record-${recordId}.pdf`);
};

const RecordsPage = () => {
  return (
    <div className="space-y-8">
      <Header
        title="Medical Records"
        description="Review your consultation history, diagnoses, and prescriptions."
      />

      <div className="grid gap-6">
        {records.map((record) => (
        <div
          key={record.id}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="grid gap-6 lg:grid-cols-[280px_1fr_180px]">
            {/* LEFT */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900">
                    Consultation Record
                  </h3>

                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    Completed
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {record.date}
                </p>
              </div>

              <div>
                <p className="font-medium text-slate-900">
                  {record.doctor}
                </p>

                <p className="text-sm text-slate-500">
                  {record.specialty}
                </p>
              </div>
            </div>

            {/* MIDDLE */}
            <div className="space-y-4 border-y border-slate-100 py-4 lg:border-x lg:border-y-0 lg:px-6 lg:py-0">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <h4 className="font-medium text-slate-900">
                    Diagnosis
                  </h4>
                </div>

                <p className="text-sm text-slate-700">
                  {record.diagnosis}
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Pill className="h-4 w-4 text-emerald-600" />
                  <h4 className="font-medium text-slate-900">
                    Prescription
                  </h4>
                </div>

                <ul className="space-y-1">
                  {record.prescription.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm text-slate-700"
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-3 lg:items-end">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 lg:w-40">
                <Eye className="h-4 w-4" />
                View Record
              </button>

              <button
                onClick={() => downloadBlankPdf(record.id)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 lg:w-40"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default RecordsPage;