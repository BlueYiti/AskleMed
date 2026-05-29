import { ReactNode } from "react";
import DoctorSidebar from "@/components/layout/doctor-sidebar";

export default function DoctorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-100 md:flex">
      <DoctorSidebar />

      <section className="flex-1 min-w-0">
        <div className="pt-16 md:pt-8 p-4 md:p-8">
          {children}
        </div>
      </section>
    </main>
  );
}