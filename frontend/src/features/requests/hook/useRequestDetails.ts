"use client";

import { useEffect, useState } from "react";
import { requestService } from "../services/request.service";
import type { RequestItem } from "../types/request";

export default function useRequestDetails(id: string) {
  const [request, setRequest] = useState<RequestItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function fetchRequest() {
      const requestId = Number(id);

      if (!Number.isInteger(requestId) || requestId <= 0) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(false);

        const data = await requestService.getById(requestId);

        if (isActive) {
          setRequest(data);
        }
      } catch (err) {
        if (isActive) {
          setError(true);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    fetchRequest();

    return () => {
      isActive = false;
    };
  }, [id]);

  return { request, loading, error };
}
