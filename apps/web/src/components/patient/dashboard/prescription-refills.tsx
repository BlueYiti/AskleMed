"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Loader2, Pill } from "lucide-react";

interface Prescription {
  id: string;
  name: string;
  dosage: string;
  refillsLeft: number;
  prescribedBy: string;
  expiresAt: string;
}

export const PrescriptionRefills = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [refillingId, setRefillingId] = useState<string | null>(null);

  // Fetch prescriptions
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/patients/prescriptions`,
          { credentials: "include" }
        );
        if (!response.ok) throw new Error("Failed to fetch prescriptions");
        const data = await response.json();
        setPrescriptions(data);
      } catch (error) {
        console.error(error);
        // Fallback mock data (remove once API is ready)
        setPrescriptions([
          {
            id: "1",
            name: "Lisinopril",
            dosage: "10mg once daily",
            refillsLeft: 2,
            prescribedBy: "Dr. Smith",
            expiresAt: "2026-01-01",
          },
          {
            id: "2",
            name: "Metformin",
            dosage: "500mg twice daily",
            refillsLeft: 0,
            prescribedBy: "Dr. Johnson",
            expiresAt: "2025-12-01",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  const handleRequestRefill = async (prescriptionId: string) => {
    setRefillingId(prescriptionId);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/patients/prescriptions/${prescriptionId}/request-refill`,
        { method: "POST", credentials: "include" }
      );
      if (!response.ok) throw new Error("Refill request failed");
      // Update local state: decrease refillsLeft by 1 or mark as requested
      setPrescriptions((prev) =>
        prev.map((rx) =>
          rx.id === prescriptionId
            ? { ...rx, refillsLeft: Math.max(0, rx.refillsLeft - 1) }
            : rx
        )
      );
      alert("Refill request sent to your pharmacy!");
    } catch (error) {
      console.error(error);
      alert("Could not request refill. Please try again.");
    } finally {
      setRefillingId(null);
    }
  };

  const activePrescriptions = prescriptions.filter((rx) => rx.refillsLeft > 0);

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          Prescription Refills
        </h2>
        <Link
          href="/patient/prescriptions"
          className="text-sm text-blue-600 hover:underline"
        >
          View all
        </Link>
      </div>

      {activePrescriptions.length === 0 ? (
        <div className="mt-6 text-center py-8">
          <Pill className="mx-auto h-10 w-10 text-slate-300" />
          <p className="mt-2 text-sm text-slate-500">
            No active prescriptions with refills.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {activePrescriptions.map((rx) => (
            <div
              key={rx.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl bg-slate-50 p-4 gap-3"
            >
              <div>
                <p className="font-semibold text-slate-900">{rx.name}</p>
                <p className="text-xs text-slate-500">{rx.dosage}</p>
                <p className="text-xs text-slate-500">
                  {rx.prescribedBy} · {rx.refillsLeft} refill
                  {rx.refillsLeft !== 1 ? "s" : ""} left
                </p>
              </div>
              <button
                onClick={() => handleRequestRefill(rx.id)}
                disabled={refillingId === rx.id}
                className="w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
              >
                {refillingId === rx.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Request Refill"
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};