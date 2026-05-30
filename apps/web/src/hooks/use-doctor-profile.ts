"use client";

import { useEffect, useState } from "react";

import {
  getMyDoctor,
  updateDoctor,
} from "@/services/doctor.service";

export function useDoctorProfile() {
  const [doctor, setDoctor] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  async function loadProfile() {
    try {
      const data =
        await getMyDoctor();

      setDoctor(data);
    } finally {
      setLoading(false);
    }
  }

  async function saveProfile(
    values: any
  ) {
    const updated =
      await updateDoctor(values);

    setDoctor(updated);

    return updated;
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    doctor,
    loading,
    saveProfile,
  };
}