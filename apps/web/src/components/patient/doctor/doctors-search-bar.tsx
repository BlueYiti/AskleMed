"use client";

import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const DoctorsSearchBar = ({ value, onChange }: Props) => {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <Input
        placeholder="Search doctors by name or specialization..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DoctorsSearchBar;