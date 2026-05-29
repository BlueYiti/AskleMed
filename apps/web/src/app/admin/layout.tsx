import { ReactNode } from "react";
import AdminSidebar from "@/components/layout/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-100 md:flex">
      <AdminSidebar />

      <section className="flex-1 min-w-0 md:ml-65">
        <div className="pt-16 md:pt-8 p-4 md:p-8">
          {children}
        </div>
      </section>
    </main>
  );
}