"use client";

import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href="/patient/doctors"
      className="inline-flex items-center px-3 py-2 rounded border hover:bg-gray-100 transition"
    >
      ← Back to Doctors
    </Link>
  );
}