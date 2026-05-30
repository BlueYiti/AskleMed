"use client";

import { use } from "react";
import Header from "@/components/layout/header";
import { useAppointments } from "@/hooks/use-appointments";

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
  const { loading, categorized } = useAppointments();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-600">Loading appointment...</p>
      </div>
    );
  }

  // ✅ FIX: only use existing categories
  const appointment = [
    ...categorized.today,
    ...categorized.upcoming,
    ...categorized.inProgress,
    ...categorized.completed,
    ...categorized.cancelled,
  ].find((a) => a._id === appointmentId);

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
          <AppointmentDoctorCard appointment={appointment} />
          <AppointmentScheduleCard appointment={appointment} />
          <AppointmentReasonCard appointment={appointment} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6 lg:sticky lg:top-6 h-fit">
          <AppointmentStatusBadge status={appointment.status} />
          <AppointmentCountdown appointment={appointment} />
          <AppointmentActions appointment={appointment} />
          <AppointmentSummary appointment={appointment} />
        </div>
      </div>
    </div>
  );
}