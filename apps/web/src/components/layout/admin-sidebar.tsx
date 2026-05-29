"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import {
  CalendarDays,
  Stethoscope,
  Users,
  Bell,
  Settings,
  Activity,
  FileText,
  Shield,
  LogOut,
  Loader2,
} from "lucide-react";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const links = [
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: Activity,
  },
  {
    label: "Appointments",
    href: "/admin/appointments",
    icon: CalendarDays,
  },
  {
    label: "Consultations",
    href: "/admin/consultations",
    icon: Stethoscope,
  },
  {
    label: "Doctors",
    href: "/admin/doctor",
    icon: Shield,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    label: "Logs",
    href: "/admin/logs",
    icon: FileText,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

const AdminSidebar = () => {
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
    <aside className="w-65 h-screen bg-linear-to-b from-slate-800 to-slate-900 rounded-r-[40px] px-6 py-8 flex flex-col text-white shadow-2xl">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <Image
          src="/images/logo/white-logo.png"
          alt="AskliMed Logo"
          width={50}
          height={50}
        />

        <div>
          <p className="text-xs text-slate-300">
            AskliMed
          </p>

          <h1 className="font-semibold text-lg">
            Admin Portal
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-3 flex-1">
        {links.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-sm font-medium ${
                isActive
                  ? "bg-white/15 shadow-lg"
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

export default AdminSidebar;