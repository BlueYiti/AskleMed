import { ReactNode } from "react";
import PatientSidebar from "@/components/layout/patient-sidebar";

export default function PatientLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-100 md:flex">
      <PatientSidebar />

      <section className="flex-1 min-w-0">
        <div className="pt-16 md:pt-8 p-4 md:p-8">
          {children}
        </div>
      </section>
    </main>
  );
}