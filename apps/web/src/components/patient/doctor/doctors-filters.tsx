"use client";

import { DoctorFilters } from "@/../../../packages/shared/src/types/doctor";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  filters: DoctorFilters;
  onChange: (filters: DoctorFilters) => void;
}

const SPECIALIZATIONS = [
  { key: "all", label: "All" },
  { key: "primary_care", label: "Primary Care" },
  { key: "women_health", label: "Women's Health" },
  { key: "mental_health", label: "Mental Health" },
  { key: "dermatology", label: "Dermatology" },
  { key: "cardiology", label: "Cardiology" },
  { key: "neurology", label: "Neurology" },
  { key: "endocrinology", label: "Endocrinology" },
  { key: "gastroenterology", label: "Gastroenterology" },
  { key: "pulmonology", label: "Pulmonology" },
  { key: "orthopedics", label: "Orthopedics" },
  { key: "urology_nephrology", label: "Urology / Nephrology" },
  { key: "ophthalmology", label: "Ophthalmology" },
  { key: "ent", label: "ENT" },
  { key: "infectious_disease", label: "Infectious Disease" },
  { key: "urgent_care", label: "Urgent Care" },
] as const;

const DoctorsFilters = ({ filters, onChange }: Props) => {
  const reset = () => {
    onChange({
      search: "",
      specialization: "all",
      availability: "all",
      consultationType: "all",
    });
  };

  return (
    <div className="rounded-2xl border bg-white p-4 space-y-3.5 shadow-sm">
      <h2 className="font-semibold">Filters</h2>

      {/* SPECIALIZATION (BUTTON FILTERS) */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Specialization</h3>

        <div className="flex flex-wrap gap-2">
          {SPECIALIZATIONS.map((spec) => {
            const isActive = filters.specialization === spec.key;

            return (
              <button
                key={spec.key}
                onClick={() =>
                  onChange({
                    ...filters,
                    specialization: spec.key,
                  })
                }
                className={`
                  px-3 py-1.5 rounded-full text-sm border transition
                  ${
                    isActive
                      ? "bg-black text-white border-black"
                      : "bg-white hover:bg-gray-100 border-gray-300"
                  }
                `}
              >
                {spec.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Consultation Type */}
      <h3 className="text-sm font-medium">Consultation Type</h3>
      <Select
        value={filters.consultationType}
        onValueChange={(value) =>
          onChange({
            ...filters,
            consultationType: value as "all" | "online" | "in_person",
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Consultation Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="online">Online</SelectItem>
          <SelectItem value="in_person">In Person</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={reset} className="w-full">
        Reset Filters
      </Button>
    </div>
  );
};

export default DoctorsFilters;