"use client";

import { use } from "react";
import Header from "@/components/layout/header";
import { useConsultations } from "@/hooks/use-consultations";

import AppointmentDoctorCard from "@/components/layout/appointments/details/details-doctor-card";
import AppointmentScheduleCard from "@/components/layout/appointments/details/schedule-card";
import AppointmentReasonCard from "@/components/layout/appointments/details/reason-card";
import AppointmentStatusBadge from "@/components/layout/appointments/details/status-badge";
import AppointmentCountdown from "@/components/layout/appointments/details/details-countdown";
import AppointmentActions from "@/components/layout/appointments/details/details-actions";
import AppointmentSummary from "@/components/layout/appointments/details/details-summary";

interface PageProps {
  params: Promise<{ appointmentId: string }>;
}

export default function AppointmentDetailsPage({ params }: PageProps) {
  const { appointmentId } = use(params);
  const { loading, categorized } = useConsultations();

  const appointment = [
    ...categorized.upcoming,
    ...categorized.completed,
    ...categorized.cancelled,
    ...categorized.past,
  ].find((a) => a._id === appointmentId);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-600">Loading appointment...</p>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="space-y-6">
        <Header title="Appointment" description="Not found" />
        <p className="text-sm text-muted-foreground">
          Appointment not found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <Header
        title="Appointment Details"
        description="View consultation information"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="order-1">
            <AppointmentDoctorCard appointment={appointment} />
          </div>

          <div className="order-4">
            <AppointmentScheduleCard appointment={appointment} />
          </div>

          <div className="order-5">
            <AppointmentReasonCard appointment={appointment} />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6 lg:sticky lg:top-6 h-fit">
          <div className="order-3">
            <AppointmentActions appointment={appointment} />
          </div>

          <div className="order-2">
            <AppointmentCountdown appointment={appointment} />
          </div>

          <div className="order-6">
            <AppointmentSummary appointment={appointment} />
          </div>

          <div className="order-0">
            <AppointmentStatusBadge status={appointment.status} />
          </div>
        </div>
      </div>
    </div>
  );
}