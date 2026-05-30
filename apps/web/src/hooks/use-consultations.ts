"use client";

import { useEffect, useState } from "react";

export interface Consultation {
  _id: string;

  doctor: {
    name: string;
    specialty: string;
  };

  diagnosis?: string;

  schedule: {
    startsAt: string;
    endsAt?: string;
  };

  status: "completed";

  documents: {
    hasPrescription: boolean;
    hasCertificate: boolean;
    hasLabRequest: boolean;
  };
}

export function useConsultations() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/me`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch consultations");
        }

        const data = await res.json();
        console.log("Fetched consultations:", data.appointments);

        const completedConsultations = (data.appointments || []).filter(
          (consultation: Consultation) =>
            consultation.status === "completed"
        );

        setConsultations(completedConsultations);
      } catch (error) {
        console.error("Failed to fetch consultations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  return {
    consultations,
    loading,
  };
}