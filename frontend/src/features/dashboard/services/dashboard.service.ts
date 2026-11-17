import { api } from "@/features/services/api";

import type { DashboardStats } from "../types/dashboard";

export const dashboardService = {
  async getStats() {
    const response = await api.get<DashboardStats>("/stats");
    return response.data;
  },
};
