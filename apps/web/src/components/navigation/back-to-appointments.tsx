"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <Link
      href="/patient/appointments"
      className="z-50 flex items-center justify-center gap-2 rounded-full border bg-blue-500 backdrop-blur px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-white hover:text-black hover:shadow-md active:scale-[0.98]"
    >
      <span>Go to Appointments</span>
    </Link>
  );
}