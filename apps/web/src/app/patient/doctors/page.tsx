"use client";

import { useState } from "react";
import Header from "@/components/layout/header";
import DoctorsSearchBar from "@/components/patient/doctor/doctors-search-bar";
import DoctorsFilters from "@/components/patient/doctor/doctors-filters";
import DoctorsList from "@/components/patient/doctor/doctors-list";
import { DoctorFilters } from "@/../../../packages/shared/src/types/doctor";

const DoctorsPage = () => {
  const [filters, setFilters] = useState<DoctorFilters>({
    search: "",
    specialization: "all",
    availability: "all",
    consultationType: "all",
  });

  return (
    <div className="space-y-8">
      <Header
        title="Doctors"
        description="Find and connect with healthcare professionals 🩺"
      />

      {/* Search */}
      <DoctorsSearchBar
        value={filters.search}
        onChange={(value) =>
          setFilters((prev) => ({ ...prev, search: value }))
        }
      />

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="lg:col-span-1">
          <DoctorsFilters filters={filters} onChange={setFilters} />
        </div>

        {/* List */}
        <div className="lg:col-span-3">
          <DoctorsList filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;