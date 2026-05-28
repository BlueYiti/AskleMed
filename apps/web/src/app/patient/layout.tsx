import { ReactNode } from "react";

import PatientSidebar from "@/components/layout/patient-sidebar";

type PatientLayoutProps = {
  children: ReactNode;
};

const PatientLayout = ({
  children,
}: PatientLayoutProps) => {
  return (
    <main className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <PatientSidebar />

      {/* Page Content */}
      <section className="flex-1 overflow-y-auto">
        {children}
      </section>
    </main>
  );
};

export default PatientLayout;