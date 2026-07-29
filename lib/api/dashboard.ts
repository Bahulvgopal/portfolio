import DashboardService from "@/services/DashboardService";

export async function getDashboardStats() {
  return DashboardService.getStats();
}