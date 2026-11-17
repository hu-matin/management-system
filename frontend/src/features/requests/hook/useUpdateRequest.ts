"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { requestService } from "../services/request.service";
import type { UpdateRequestPayload } from "../types/request";

export default function useUpdateRequest() {
  const [loading, setLoading] = useState(false);

  const updateRequest = async (id: number, data: UpdateRequestPayload) => {
    try {
      setLoading(true);

      await requestService.update(id, data);

      toast.success("درخواست با موفقیت ویرایش شد.");

      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast.error(
          "این درخواست توسط کاربر دیگری تغییر کرده است. برای دریافت اطلاعات جدید صفحه را بارگذاری کنید.",
          {
            action: {
              label: "بارگذاری مجدد",
              onClick: () => window.location.reload(),
            },
            duration: 10000,
          },
        );
      } else if (axios.isAxiosError(error) && error.response?.status === 503) {
        toast.error(
          "سرور موقتاً در دسترس نیست. لطفاً کمی بعد دوباره تلاش کنید.",
        );
      } else {
        toast.error("ویرایش درخواست با خطا مواجه شد.");
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateRequest, loading };
}
