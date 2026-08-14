import {
  FolderKanban,
  Award,
  GraduationCap,
  Briefcase,
  Wrench,
} from "lucide-react";

import StatCard from "@/components/admin/StatCard";
import { getDashboardStats } from "@/lib/api/dashboard";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";

export default async function DashboardPage() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect("/login");
  }

  // keep all your existing dashboard code below this
  const stats = await getDashboardStats();

  return (
    <div className="min-h-screen bg-[#0a0a0b] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-6 sm:mb-8">
          <h1
            className="text-2xl sm:text-3xl font-normal text-white"
            style={{ fontFamily: "'Georgia','Times New Roman',serif" }}
          >
            Dashboard
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500">
            Overview of your portfolio content.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          <StatCard
            title="Projects"
            value={stats.projects}
            icon={FolderKanban}
          />

          <StatCard
            title="Certificates"
            value={stats.certificates}
            icon={Award}
          />

          <StatCard
            title="Education"
            value={stats.education}
            icon={GraduationCap}
          />

          <StatCard
            title="Experience"
            value={stats.experience}
            icon={Briefcase}
          />

          <StatCard
            title="Skills"
            value={stats.skills}
            icon={Wrench}
          />
        </div>
      </div>
    </div>
  );
}