import { ReactNode } from "react";

import AdminSidebar from "@/components/layout/admin-sidebar";

type AdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout = ({
  children,
}: AdminLayoutProps) => {
  return (
    <main className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Page Content */}
      <section className="flex-1 overflow-y-auto">
        {children}
      </section>
    </main>
  );
};

export default AdminLayout;