"use client";

import { useCallback, useEffect, useState } from "react";
import { dashboardService } from "../services/dashboard.service";
import type { DashboardStats } from "../types/dashboard";

export default function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await dashboardService.getStats();

      setStats(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "دریافت اطلاعات داشبورد با خطا مواجه شد",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
}
