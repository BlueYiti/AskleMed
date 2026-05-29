"use client";

import { useEffect, useMemo, useState } from "react";
import { isAfter, isBefore } from "date-fns";

export type ConsultationTab = "upcoming" | "completed" | "cancelled" | "past";

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

  status: ConsultationTab;

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
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/consultations/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        setConsultations(data.consultations || []);
      } catch (err) {
        console.error("Failed to fetch consultations", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categorized = useMemo(() => {
    const now = new Date();

    return {
      upcoming: consultations.filter(
        (c) =>
          c.status !== "cancelled" &&
          isAfter(new Date(c.schedule.startsAt), now)
      ),

      completed: consultations.filter((c) => c.status === "completed"),

      cancelled: consultations.filter((c) => c.status === "cancelled"),

      past: consultations.filter(
        (c) =>
          c.status !== "cancelled" &&
          isBefore(new Date(c.schedule.endsAt || c.schedule.startsAt), now)
      ),
    };
  }, [consultations]);

  return { consultations, categorized, loading };
}