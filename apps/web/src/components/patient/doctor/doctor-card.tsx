"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/../../../packages/shared/src/types/doctor";
import { formatSpecialization } from "@/utils/format-specialization";

interface Props {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: Props) => {
  const isAvailable = doctor.availability?.isAvailableToday;

  return (
    <Card className="p-4 transition-all hover:shadow-md hover:-translate-y-0.5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={doctor.photoUrl || "/placeholder-avatar.png"}
            alt={doctor.name}
            className="h-14 w-14 rounded-full object-cover border shrink-0"
          />

          <div className="min-w-0">
            <h3 className="font-semibold truncate">{doctor.name}</h3>

            <p className="text-sm text-muted-foreground">
              {formatSpecialization(doctor.specialization)}
            </p>

            <p className="text-xs text-muted-foreground">
              {doctor.experienceYears} years experience
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:shrink-0">
          
          <span
            className={[
              "text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap w-fit",
              isAvailable
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-500",
            ].join(" ")}
          >
            {isAvailable ? "Available Today" : "Unavailable"}
          </span>

          <Link href={`/patient/doctors/${doctor._id}`}>
            <Button size="sm" className="w-full sm:w-auto">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default DoctorCard;