"use client";

import { useState } from "react";
import { toast } from "sonner";

import { requestService } from "../services/request.service";
import type { CreateRequestPayload } from "../types/request";

const DRAFT_KEY = "request-create-draft";

export default function useCreateRequest() {
  const [loading, setLoading] = useState(false);

  const createRequest = async (data: CreateRequestPayload) => {
    try {
      setLoading(true);

      await requestService.create(data);

      // حذف پیش‌نویس فقط پس از ثبت موفق درخواست
      localStorage.removeItem(DRAFT_KEY);

      toast.success("درخواست با موفقیت ثبت شد.");

      return true;
    } catch {
      toast.error("ثبت درخواست با خطا مواجه شد. اطلاعات شما حفظ شده است.");

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createRequest, loading };
}
