import { notFound } from "next/navigation";
import type { Doctor } from "@/../../../packages/shared/src/types/doctor";
import BackButton from "@/components/navigation/back-to-doctors-list";
import Link from "next/link";

interface Props {
  params: Promise<{ doctorId: string }>;
}

export default async function DoctorProfilePage({ params }: Props) {
  const { doctorId } = await params;

  if (!doctorId) return notFound();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/doctors/${encodeURIComponent(
      doctorId
    )}`,
    { cache: "no-store" }
  );

  if (res.status === 404) return notFound();
  if (!res.ok) throw new Error("Failed to fetch doctor");

  const doctor = (await res.json()) as Doctor;
  
  const hasBookingLink = Boolean(doctor.calLink);

  console.log("Fetched doctor:", doctor);

  const specializationLabel = doctor.specialization
    ?.replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* BACK BUTTON */}
      <BackButton />
      {/* HEADER */}
      <div className="flex gap-6 items-start">
        {/* Photo */}
        <img
          src={doctor.photoUrl || "/placeholder.png"}
          alt={doctor.name}
          className="w-32 h-32 rounded-xl object-cover border"
        />

        {/* Basic Info */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">{doctor.name}</h1>

          <p className="text-muted-foreground">
            {specializationLabel} • {doctor.experienceYears} years experience
          </p>

          <p className="text-sm">
            {doctor.availability?.isAvailableToday ? (
              <span className="text-green-600 font-medium">
                Available today
              </span>
            ) : (
              <span className="text-red-500 font-medium">
                Not available today
              </span>
            )}
          </p>

          <p className="text-lg font-medium text-primary">
            ₱{doctor.consultationFee} / consultation
          </p>
        </div>
      </div>

      {/* ABOUT */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">About</h2>
        <p className="text-muted-foreground">{doctor.bio}</p>
      </div>

      {/* CLINIC INFO */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-1">Clinic</h3>
          <p>{doctor.clinicName}</p>
          <p className="text-muted-foreground text-sm">
            {doctor.clinicAddress}
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-1">Languages</h3>
          <p className="text-muted-foreground">
            {doctor.languages?.join(", ")}
          </p>
        </div>
      </div>

      {/* CONSULTATION TYPES */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Consultation Types</h2>

        <div className="flex gap-2 flex-wrap">
          {doctor.consultationTypes?.map((type) => (
            <span
              key={type}
              className="px-3 py-1 rounded-full border text-sm capitalize"
            >
              {type.replace("_", " ")}
            </span>
          ))}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 pt-4">
        <Link
          href={`/patient/payment/${doctor._id}`}
          className={`px-4 py-2 rounded text-center transition-colors duration-200 ${
            hasBookingLink
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-gray-600 pointer-events-none"
          }`}
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
}