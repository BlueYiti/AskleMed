"use client";

import DoctorCard from "./doctor-card";
import { useDoctors } from "@/hooks/use-doctors";
import { DoctorFilters } from "@/../../../packages/shared/src/types/doctor";

interface Props {
  filters: DoctorFilters;
}

const DoctorsList = ({ filters }: Props) => {
  const { doctors, loading } = useDoctors(filters);

  if (loading) {
    return <div className="text-muted-foreground">Loading doctors...</div>;
  }

  if (!doctors.length) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No doctors found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor._id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorsList;