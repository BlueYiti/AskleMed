"use client";

import { useEffect, useState } from "react";
import {
  Doctor,
  DoctorFilters,
} from "@/../../../packages/shared/src/types/doctor";

export const useDoctors = (filters: DoctorFilters) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();

        if (filters.search) {
          params.append("search", filters.search);
        }

        if (filters.specialization && filters.specialization !== "all") {
          params.append("specialization", filters.specialization);
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/doctors?${params.toString()}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const data = await res.json();

        setDoctors(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      fetchDoctors();
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [filters.search, filters.specialization]);

  return {
    doctors,
    loading,
    error,
  };
};