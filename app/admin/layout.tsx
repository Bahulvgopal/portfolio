import type { ReactNode } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#070a13] text-stone-100 flex flex-col lg:flex-row overflow-x-hidden selection:bg-orange-500/30 selection:text-orange-200">
      {/* 1. Global Background Ambient Refraction Shapes (visible through glassmorphic cards) */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-24 -left-20 w-[550px] h-[550px] rounded-[60px] rotate-12 bg-gradient-to-br from-orange-500/30 via-rose-500/25 to-transparent blur-[110px] z-0 animate-pulse"
        style={{ animationDuration: "8s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed top-1/3 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-amber-500/20 via-orange-600/15 to-transparent blur-[140px] z-0"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-24 left-1/3 w-[500px] h-[500px] rounded-[50px] -rotate-12 bg-gradient-to-tr from-rose-600/20 via-orange-500/15 to-transparent blur-[130px] z-0"
      />

      {/* 2. Micro Noise Texture */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.035] z-0"
        style={{ backgroundImage: GRAIN_URL, backgroundRepeat: "repeat", backgroundSize: "128px" }}
      />

      {/* 3. Sidebar Navigation */}
      <Sidebar />

      {/* 4. Main Body (offset for fixed sidebar on desktop) */}
      <div className="relative z-10 flex flex-1 flex-col min-w-0 lg:pl-72 w-full">
        <Topbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
