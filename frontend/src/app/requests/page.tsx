"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw, Search, X } from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { H2, P } from "@/components/Ui/typography/Typography";

import RecentRequestsTable from "@/features/dashboard/components/RecentRequestsTable";
import RequestPagination from "@/features/dashboard/components/RequestPagination";

import { requestService } from "@/features/requests/services/request.service";
import type {
  RequestItem,
  RequestStatus,
  RequestPriority,
} from "@/features/requests/types/request";

export default function RequestsPage() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [status, setStatus] = useState<RequestStatus | "">("");
  const [priority, setPriority] = useState<RequestPriority | "">("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const data = await requestService.getAll({
        q: debouncedSearch || undefined,
        status: status || undefined,
        priority: priority || undefined,
        page,
        page_size: pageSize,
      });

      setRequests(data.items);
      setTotalPages(data.total_pages);
    } catch {
      setError(true);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, status, priority, page]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const clearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setStatus("");
    setPriority("");
    setPage(1);
  };

  const hasFilters = search !== "" || status !== "" || priority !== "";

  return (
    <DashboardLayout
      title="درخواست‌ها"
      description="مشاهده و مدیریت درخواست‌های ثبت‌شده"
    >
      <section className="space-y-6">
     <div className="grid grid-cols-1 gap-3 rounded-2xl border border-[#E5ECE8] bg-[#FCFDFC] p-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#84938C]"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="جستجو بر اساس عنوان..."
              className="w-full rounded-xl border border-[#E5ECE8] bg-white py-3 pr-10 pl-10 text-sm text-[#24352F] outline-none transition placeholder:text-[#AAB5AF] focus:border-[#287C68]"
            />

            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                aria-label="پاک کردن جستجو"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#84938C] hover:text-[#24352F]"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as RequestStatus | "");
              setPage(1);
            }}
            className="w-full rounded-xl border border-[#E5ECE8] bg-white px-3 py-3 text-sm text-[#24352F] outline-none focus:border-[#287C68]"
          >
            <option value="">همه وضعیت‌ها</option>
            <option value="new">جدید</option>
            <option value="in_progress">در حال بررسی</option>
            <option value="completed">تکمیل‌شده</option>
          </select>

          <select
            value={priority}
            onChange={(event) => {
              setPriority(event.target.value as RequestPriority | "");
              setPage(1);
            }}
            className="w-full rounded-xl border border-[#E5ECE8] bg-white px-3 py-3 text-sm text-[#24352F] outline-none focus:border-[#287C68]"
          >
            <option value="">همه اولویت‌ها</option>
            <option value="low">کم</option>
            <option value="medium">متوسط</option>
            <option value="high">زیاد</option>
          </select>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#E8F3EF] px-4 py-3 text-sm font-medium text-[#287C68] transition hover:bg-[#DCEDE6] sm:col-span-2 lg:col-span-3 lg:justify-self-start"
            >
              <X size={16} />
              پاک کردن فیلترها
            </button>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#E5ECE8] bg-[#FCFDFC]">
          <div className="border-b border-[#E5ECE8] p-5">
            <P className="text-sm font-medium text-[#24352F]">
              لیست درخواست‌ها
            </P>
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
                onClick={fetchRequests}
                className="flex items-center gap-2 rounded-lg bg-[#E8F3EF] px-4 py-2 text-sm font-medium text-[#287C68]"
              >
                <RefreshCw size={16} />
                تلاش مجدد
              </button>
            </div>
          ) : requests.length === 0 ? (
            <div className="flex flex-col items-center gap-3 p-10 text-center">
              <Search size={28} className="text-[#AAB5AF]" />

              <P className="text-sm font-medium text-[#24352F]">
                درخواستی پیدا نشد.
              </P>

              <P className="text-sm text-[#84938C]">
                عبارت جستجو یا فیلترهای انتخاب‌شده را تغییر دهید.
              </P>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-medium text-[#287C68] hover:text-[#174E43]"
                >
                  پاک کردن فیلترها
                </button>
              )}
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
        </div>
      </section>
    </DashboardLayout>
  );
}
