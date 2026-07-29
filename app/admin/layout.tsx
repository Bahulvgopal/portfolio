import type { ReactNode } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0a0a0b]">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0">
        <Topbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}