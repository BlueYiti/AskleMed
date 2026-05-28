"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import {
  LayoutDashboard,
  CalendarDays,
  Stethoscope,
  Users,
  Bell,
  Clock3,
  Settings,
  User,
  LogOut,
  Loader2,
} from "lucide-react";

import { useState } from "react";

import { authClient } from "@/lib/auth-client";

const links = [
  {
    label: "Dashboard",
    href: "/doctor/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Appointments",
    href: "/doctor/appointments",
    icon: CalendarDays,
  },
  {
    label: "Consultations",
    href: "/doctor/consultation",
    icon: Stethoscope,
  },
  {
    label: "Patients",
    href: "/doctor/patients",
    icon: Users,
  },
  {
    label: "Schedule",
    href: "/doctor/schedule",
    icon: Clock3,
  },
  {
    label: "Notifications",
    href: "/doctor/notifications",
    icon: Bell,
  },
  {
    label: "Profile",
    href: "/doctor/profile",
    icon: User,
  },
  {
    label: "Settings",
    href: "/doctor/settings",
    icon: Settings,
  },
];

const DoctorSidebar = () => {
  const pathname = usePathname();

  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] =
    useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      await authClient.signOut();

      router.push("/login");

      router.refresh();
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside className="w-65 h-screen bg-linear-to-b from-blue-500 to-blue-600 rounded-r-[40px] px-6 py-8 flex flex-col text-white shadow-2xl">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <Image
          src="/images/logo/white-logo.png"
          alt="AskliMed Logo"
          width={50}
          height={50}
        />

        <div>
          <p className="text-xs text-blue-100">
            AskliMed
          </p>

          <h1 className="font-semibold text-lg">
            Doctor Portal
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-3 flex-1">
        {links.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-sm font-medium ${
                isActive
                  ? "bg-white/20 shadow-lg"
                  : "hover:bg-white/10"
              }`}
            >
              <Icon className="w-5 h-5" />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium hover:bg-white/10 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoggingOut ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <LogOut className="w-5 h-5" />
        )}

        <span>
          {isLoggingOut
            ? "Logging out..."
            : "Log out"}
        </span>
      </button>
    </aside>
  );
};

export default DoctorSidebar;