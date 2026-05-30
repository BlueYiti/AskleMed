"use client";

import { useEffect, useMemo, useState } from "react";

import { authClient } from "@/lib/auth-client";

import { DashboardData } from "@/types/dashboard";
import { Appointment } from "@/types/dashboard";

import { PrescriptionRefills } from "@/components/patient/dashboard/prescription-refills";
import { DashboardHero } from "@/components/patient/dashboard/hero";
import { DashboardStats } from "@/components/patient/dashboard/stats";
import { UpcomingAppointments } from "@/components/patient/dashboard/upcoming-appointments";
import { dashboardGradients, dashboardIcons } from "@/components/patient/dashboard/constants";
import { HealthTipRotator } from "@/components/patient/dashboard/health-tip-rotator";

const PatientDashboardPage = () => {
  const [user, setUser] = useState<any>(null);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medicalRecordsCount, setMedicalRecordsCount] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);

  const [prescriptions, setPrescriptions] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const session = await authClient.getSession();
        const currentUser = session?.data?.user ?? null;

        setUser(currentUser);

        const [dashboardRes, prescriptionsRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/patients/dashboard`,
            {
              credentials: "include",
            }
          ),

          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/prescriptions/me`,
            {
              credentials: "include",
            }
          ),
        ]);

        if (!dashboardRes.ok) {
          throw new Error("Failed to fetch dashboard");
        }

        const dashboardData: DashboardData =
          await dashboardRes.json();

        setAppointments(dashboardData.appointments);
        setMedicalRecordsCount(
          dashboardData.medicalRecordsCount
        );
        setDoctorsCount(dashboardData.doctorsCount);

        // prescriptions
        if (prescriptionsRes.ok) {
          const prescriptionsData =
            await prescriptionsRes.json();

          setPrescriptions(
            prescriptionsData?.prescriptions ?? []
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  /**
   * Derived: upcoming appointments
   */
  const upcomingAppointments = useMemo(() => {
    return appointments
      .filter(
        (a) =>
          a.status === "confirmed" ||
          a.status === "pending"
      )
      .sort(
        (a, b) =>
          new Date(a.startsAt).getTime() -
          new Date(b.startsAt).getTime()
      );
  }, [appointments]);

  /**
   * Has prescriptions
   */
  const hasPrescriptions = prescriptions.length > 0;

  /**
   * Stats
   */
  const stats = useMemo(() => {
    return [
      {
        title: "Upcoming Appointments",
        value: upcomingAppointments.length,
        gradient: dashboardGradients.appointments,
        icon: dashboardIcons.appointments,
      },
      {
        title: "Consultations",
        value: appointments.filter(
          (a) => a.meetingLink
        ).length,
        gradient: dashboardGradients.consultations,
        icon: dashboardIcons.consultations,
      },
      {
        title: "Medical Records",
        value: medicalRecordsCount,
        gradient: dashboardGradients.records,
        icon: dashboardIcons.records,
      },
      {
        title: "Doctors",
        value: doctorsCount,
        gradient: dashboardGradients.doctors,
        icon: dashboardIcons.doctors,
      },
    ];
  }, [
    upcomingAppointments.length,
    appointments,
    medicalRecordsCount,
    doctorsCount,
  ]);

  return (
    <div className="min-h-screen space-y-8 bg-slate-50 p-4 md:p-6">
      {/* Hero */}
      <DashboardHero name={user?.name ?? ""} />

      {/* Stats */}
      <DashboardStats
        stats={stats}
        loading={loading}
      />

      {/* Main Grid */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Appointments */}
        <div className="xl:col-span-2">
          <UpcomingAppointments
            appointments={upcomingAppointments}
            loading={loading}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <HealthTipRotator />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6">
        {hasPrescriptions ? (
          <PrescriptionRefills />
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Prescription Refills
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              No active prescriptions available.
            </p>

            <div className="mt-4 inline-flex cursor-not-allowed items-center rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-400">
              Refills Unavailable
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboardPage;