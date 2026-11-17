"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, UserRound, Flag } from "lucide-react";

import { H2, P, Small, Span } from "@/components/Ui/typography/Typography";

import type { RequestStatus, RequestPriority } from "../types/request";
import useRequestDetails from "../hook/useRequestDetails";

const statusLabels: Record<RequestStatus, string> = {
  new: "جدید",
  in_progress: "در حال انجام",
  completed: "تکمیل‌شده",
};

const statusColors: Record<RequestStatus, string> = {
  new: "bg-[#EDF4FA] text-[#5289B8]",
  in_progress: "bg-[#FFF4E5] text-[#D99A36]",
  completed: "bg-[#E8F3EF] text-[#287C68]",
};

const priorityLabels: Record<RequestPriority, string> = {
  low: "کم",
  medium: "متوسط",
  high: "زیاد",
};

const priorityColors: Record<RequestPriority, string> = {
  low: "bg-[#F4F7F5] text-[#84938C]",
  medium: "bg-[#FFF4E5] text-[#D99A36]",
  high: "bg-[#FCEEEE] text-[#D65B5B]",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

interface RequestDetailsProps {
  id: string;
}

export default function RequestDetails({ id }: RequestDetailsProps) {
  const { request, loading, error } = useRequestDetails(id);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-7 w-40 animate-pulse rounded-lg bg-[#E5ECE8] sm:h-8 sm:w-48" />
        <div className="h-64 animate-pulse rounded-2xl bg-[#E5ECE8]" />
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="rounded-2xl border border-[#E5ECE8] bg-[#FCFDFC] p-5 text-center sm:p-8">
        <P className="mb-4 text-[#D65B5B]">
          درخواست موردنظر پیدا نشد یا دریافت اطلاعات با خطا مواجه شد.
        </P>

        <Link
          href="/"
          className="text-[#287C68] transition hover:text-[#174E43]"
        >
          <Span>بازگشت به درخواست‌ها</Span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[#84938C] transition hover:text-[#287C68]"
      >
        <ArrowRight size={18} />
        <Span>بازگشت به درخواست‌ها</Span>
      </Link>

      <section className="rounded-xl border border-[#E5ECE8] bg-[#FCFDFC] p-4 sm:rounded-2xl sm:p-7">
        <div className="flex flex-col items-start gap-3 border-b border-[#E5ECE8] pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pb-5">
          <H2 className="break-words pb-0 text-[#24352F]">{request.title}</H2>

          <Span
            className={`shrink-0 rounded-lg px-3 py-1.5 ${statusColors[request.status]}`}
          >
            {statusLabels[request.status]}
          </Span>
        </div>

        <div className="grid grid-cols-1 gap-3 border-b border-[#E5ECE8] py-5 sm:grid-cols-2 sm:gap-4 sm:py-6 lg:grid-cols-3">
          <div className="flex min-w-0 items-center gap-3 rounded-xl bg-[#F8FAF9] p-3 sm:p-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F3EF] text-[#287C68] sm:size-11 sm:rounded-xl">
              <UserRound size={18} />
            </div>

            <div className="min-w-0">
              <Small className="mb-2 block text-[#84938C]">درخواست‌دهنده</Small>

              <P className="mt-0 break-words text-[#24352F]">
                {request.requester}
              </P>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-3 rounded-xl bg-[#F8FAF9] p-3 sm:p-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F3EF] text-[#287C68] sm:size-11 sm:rounded-xl">
              <CalendarDays size={18} />
            </div>

            <div className="min-w-0">
              <Small className="mb-2 block text-[#84938C]">تاریخ ثبت</Small>

              <P className="mt-0 text-[#24352F]">
                {formatDate(request.created_at)}
              </P>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-3 rounded-xl bg-[#F8FAF9] p-3 sm:p-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F3EF] text-[#287C68] sm:size-11 sm:rounded-xl">
              <Flag size={18} />
            </div>

            <div className="min-w-0">
              <Small className="mb-2 block text-[#84938C]">
                اولویت درخواست
              </Small>

              <Span
                className={`inline-block rounded-lg px-3 py-1 ${priorityColors[request.priority]}`}
              >
                {priorityLabels[request.priority]}
              </Span>
            </div>
          </div>
        </div>

        <div className="py-5 sm:py-6">
          <Small className="mb-3 block text-[#84938C]">توضیحات درخواست</Small>

          <P className="mt-0 whitespace-pre-wrap break-words leading-8 text-[#24352F]">
            {request.description || "توضیحاتی برای این درخواست ثبت نشده است."}
          </P>
        </div>

        <div className="border-t border-[#E5ECE8] pt-4 sm:pt-5">
          <Small className="text-[#84938C]">
            آخرین ویرایش: {formatDate(request.updated_at)}
          </Small>
        </div>
      </section>
    </div>
  );
}
