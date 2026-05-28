import { notFound } from "next/navigation";
import Link from "next/link";
import PaymentMethodSelector from "@/components/patient/payment/payment-method-selector";
import PaymentActions from "@/components/patient/payment/payment-actions";
import { formatSpecialization } from "@/utils/format-specialization";

interface Props {
  params: { doctorId: string };
}

export default async function PaymentPage({ params }: Props) {
  const { doctorId } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/doctors/${encodeURIComponent(
      doctorId
    )}`,
    { cache: "no-store" }
  );

  if (res.status === 404) return notFound();
  if (!res.ok) throw new Error("Failed to fetch doctor");

  const doctor = await res.json();

  const fee = doctor.consultationFee;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Confirm Payment</h1>

      {/* Doctor Summary */}
      <div className="border rounded-xl p-4 space-y-2">
        <p className="font-medium">{doctor.name}</p>
        <p className="text-muted-foreground">
          {doctor.specialization
            ? formatSpecialization(doctor.specialization)
            : ""}
        </p>
        <p className="text-sm">{doctor.clinicName}</p>
      </div>

      {/* Fee Breakdown */}
      <div className="border rounded-xl p-4 space-y-2">
        <div className="flex justify-between">
          <span>Consultation Fee</span>
          <span>₱{fee}</span>
        </div>

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Platform Fee</span>
          <span>₱0 (mock)</span>
        </div>

        <hr />

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>₱{fee}</span>
        </div>
      </div>

      <PaymentMethodSelector />
      <PaymentActions
        calLink={doctor.calLink}
        cancelHref={`/patient/doctors/${doctorId}`}
      />
    </div>
  );
}