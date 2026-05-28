import { ReactNode } from "react";

import DoctorSidebar from "@/components/layout/doctor-sidebar";

type DoctorLayoutProps = {
  children: ReactNode;
};

const DoctorLayout = ({
  children,
}: DoctorLayoutProps) => {
  return (
    <main className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <DoctorSidebar />

      {/* Page Content */}
      <section className="flex-1 overflow-y-auto">
        {children}
      </section>
    </main>
  );
};

export default DoctorLayout;