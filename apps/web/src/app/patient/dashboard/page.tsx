"use client";

import { useEffect, useMemo, useState } from "react";

import Header from "@/components/layout/header";
import { authClient } from "@/lib/auth-client";
import { DashboardData } from "@/types/dashboard";
import { Appointment } from "@/types/appointment";
import { User } from "@/types/user";

import { HealthTipRotator } from "@/components/patient/dashboard/health-tip-rotator";
import { PrescriptionRefills } from "@/components/patient/dashboard/prescription-refills";
import { DashboardHero } from "@/components/patient/dashboard/hero";
import { DashboardStats } from "@/components/patient/dashboard/stats";
import { UpcomingAppointments } from "@/components/patient/dashboard/upcoming appointments";
import { QuickActions } from "@/components/patient/dashboard/quick-actions";
import {
  dashboardGradients,
  dashboardIcons,
} from "@/components/patient/dashboard/constants";

const PatientDashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);

  const [appointments, setAppointments] = useState<
    Appointment[]
  >([]);
  const [medicalRecordsCount, setMedicalRecordsCount] =
    useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const session = await authClient.getSession();
        const currentUser =
          session?.data?.user ?? null;

        setUser(currentUser);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/patients/dashboard`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch dashboard"
          );
        }

        const data: DashboardData =
          await response.json();

        setAppointments(data.appointments);
        setMedicalRecordsCount(
          data.medicalRecordsCount
        );
        setDoctorsCount(data.doctorsCount);
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
   * Stats config (fully declarative now)
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
        gradient:
          dashboardGradients.consultations,
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
            appointments={
              upcomingAppointments
            }
            loading={loading}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <QuickActions />
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="mt-6">
        <PrescriptionRefills />
      </div>
    </div>
  );
};

export default PatientDashboardPage;