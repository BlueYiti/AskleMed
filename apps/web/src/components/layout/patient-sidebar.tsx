"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Stethoscope,
  FileText,
  User,
  Bot,
  LogOut,
  Loader2,
  Menu,
  X,
  PenTool,
} from "lucide-react";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const links = [
  { label: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
  { label: "Doctors", href: "/patient/doctors", icon: Stethoscope },
  { label: "Appointments", href: "/patient/appointments", icon: CalendarDays },

  // ✏️ NEW TAB
  { label: "Consultation", href: "/patient/consultation", icon: PenTool },

  { label: "Records", href: "/patient/records", icon: FileText },
  { label: "AI Assistant", href: "/patient/ai", icon: Bot },
  { label: "Profile", href: "/patient/profile", icon: User },
];

const PatientSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authClient.signOut();
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-4 py-3 bg-blue-600 text-white">
        <div className="flex items-center gap-2">
          
          <span className="font-semibold text-sm">Patient Portal</span>
        </div>

        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:sticky z-50 top-0 left-0 h-full md:h-screen
          w-72 bg-linear-to-b from-blue-500 to-blue-600
          rounded-r-[40px] px-6 py-8 flex flex-col text-white shadow-2xl
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* CLOSE BUTTON */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* LOGO */}
        <div className="flex items-center gap-3 mb-12 px-2">
          {/* ✏️ UPDATED LOGO */}
          <Image
            src="/images/logo/white-logo.png"
            alt="AskliMed Logo"
            width={50}
            height={50}
          />
          <div>
            <p className="text-xs text-blue-100">AskliMed</p>
            <h1 className="font-semibold text-lg">Patient Portal</h1>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-3 flex-1">
          {links.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition ${
                  isActive ? "bg-white/20 shadow-lg" : "hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium hover:bg-white/10 transition disabled:opacity-60"
        >
          {isLoggingOut ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <LogOut className="w-5 h-5" />
          )}

          <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
        </button>
      </aside>
    </>
  );
};

export default PatientSidebar;