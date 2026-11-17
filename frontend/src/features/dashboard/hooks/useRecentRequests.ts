"use client";

import { useCallback, useEffect, useState } from "react";
import { requestService } from "@/features/requests/services/request.service";
import type {
  RequestItem,
  RequestStatus,
} from "@/features/requests/types/request";

export default function useRecentRequests(status: RequestStatus | null) {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 5;

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const data = await requestService.getAll({
        page,
        page_size: pageSize,
        status: status ?? undefined,
      });

      setRequests(data.items);
      setTotalPages(data.total_pages);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [page, status]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests,
    loading,
    error,
    page,
    totalPages,
    setPage,
    refetch: fetchRequests,
  };
}
