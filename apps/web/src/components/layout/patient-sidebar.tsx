"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  LayoutDashboard,
  CalendarDays,
  Stethoscope,
  FileText,
  User,
  Bot,
  LogOut,
} from "lucide-react";

const links = [
  {
    label: "Dashboard",
    href: "/patient/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Doctors",
    href: "/patient/doctors",
    icon: Stethoscope,
  },
  {
    label: "Appointments",
    href: "/patient/appointments",
    icon: CalendarDays,
  },
  {
    label: "Records",
    href: "/patient/records",
    icon: FileText,
  },
  {
    label: "AI Assistant",
    href: "/patient/ai",
    icon: Bot,
  },
  {
    label: "Profile",
    href: "/patient/profile",
    icon: User,
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] h-screen bg-gradient-to-b from-blue-500 to-blue-600 rounded-r-[40px] px-6 py-8 flex flex-col text-white shadow-2xl">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <Image src="/images/logo/white-logo.png" alt="AskliMed Logo" width={50} height={50} />

        <div>
          <p className="text-xs text-blue-100">
            AskliMed
          </p>

          <h1 className="font-semibold text-lg">
            Patient Portal
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
      <button className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium hover:bg-white/10 transition-all duration-200">
        <LogOut className="w-5 h-5" />

        <span>Log out</span>
      </button>
    </aside>
  );
};

export default Sidebar;