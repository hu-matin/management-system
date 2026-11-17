"use client";

import Link from "next/link";
import { RefreshCw } from "lucide-react";

import { P, Small } from "@/components/Ui/typography/Typography";
import type { RequestStatus } from "@/features/requests/types/request";

import useRecentRequests from "../hooks/useRecentRequests";
import RecentRequestsTable from "./RecentRequestsTable";
import RequestPagination from "./RequestPagination";

interface RecentRequestsProps {
  status: RequestStatus | null;
}

export default function RecentRequests({ status }: RecentRequestsProps) {
  const { requests, loading, error, refetch, page, totalPages, setPage } =
    useRecentRequests(status);

  return (
    <section className="overflow-hidden rounded-2xl border border-[#E5ECE8] bg-[#FCFDFC]">
      <div className="flex items-center justify-between gap-3 border-b border-[#E5ECE8] p-5">
        <Small className="mt-1 block text-[#84938C]">درخواست‌ها</Small>

        <Link
          href="/requests"
          className="shrink-0 text-sm font-medium text-[#287C68] transition hover:text-[#174E43]"
        >
          مشاهده همه
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3 p-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-12 animate-pulse rounded-xl bg-[#F4F7F5]"
            />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-3 p-8 text-center">
          <P className="text-sm text-[#D65B5B]">
            دریافت درخواست‌ها با خطا مواجه شد.
          </P>

          <button
            type="button"
            onClick={refetch}
            className="flex items-center gap-2 rounded-lg bg-[#E8F3EF] px-4 py-2 text-sm font-medium text-[#287C68]"
          >
            <RefreshCw size={16} />
            تلاش مجدد
          </button>
        </div>
      ) : requests.length === 0 ? (
        <div className="p-8 text-center">
          <P className="text-sm text-[#84938C]">
            درخواستی با این وضعیت پیدا نشد.
          </P>
        </div>
      ) : (
        <>
          <RecentRequestsTable requests={requests} />

          <RequestPagination
            page={page}
            totalPages={totalPages}
            loading={loading}
            onPageChange={setPage}
          />
        </>
      )}
    </section>
  );
}
