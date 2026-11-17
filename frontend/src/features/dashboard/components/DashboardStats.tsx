"use client";

import { ClipboardList, FilePlus2, Clock3, CircleCheck } from "lucide-react";

import { Large, P, Small } from "@/components/Ui/typography/Typography";
import useDashboardStats from "../hooks/useDashboardStats";
import type { DashboardStats as DashboardStatsType } from "../types/dashboard";

const statItems: {
  title: string;
  key: keyof DashboardStatsType;
  description: string;
  icon: typeof ClipboardList;
  color: string;
}[] = [
  {
    title: "کل درخواست‌ها",
    key: "total",
    description: "تمام درخواست‌های ثبت‌شده",
    icon: ClipboardList,
    color: "bg-[#E8F3EF] text-[#287C68]",
  },
  {
    title: "درخواست‌های جدید",
    key: "new",
    description: "در انتظار بررسی",
    icon: FilePlus2,
    color: "bg-[#EDF4FA] text-[#5289B8]",
  },
  {
    title: "در حال انجام",
    key: "in_progress",
    description: "درخواست‌های در دست بررسی",
    icon: Clock3,
    color: "bg-[#FFF4E5] text-[#D99A36]",
  },
  {
    title: "تکمیل‌شده",
    key: "completed",
    description: "درخواست‌های انجام‌شده",
    icon: CircleCheck,
    color: "bg-[#E8F3EF] text-[#287C68]",
  },
];

export default function DashboardStats() {
  const { stats, loading, error, refetch } = useDashboardStats();

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statItems.map((item) => (
          <div
            key={item.key}
            className="h-36 animate-pulse rounded-2xl border border-[#E5ECE8] bg-[#FCFDFC]"
          />
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="rounded-2xl border border-red-100 bg-white p-6 text-center">
        <P className="text-sm text-[#D65B5B]">دریافت آمار با مشکل مواجه شد.</P>

        <button
          onClick={refetch}
          className="mt-3 rounded-lg bg-[#E8F3EF] px-4 py-2 text-sm font-medium text-[#287C68]"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statItems.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.key}
            className="rounded-2xl border border-[#E5ECE8] bg-[#FCFDFC] p-5 transition duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <Small className="font-medium text-[#84938C]">{stat.title}</Small>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}
              >
                <Icon size={21} strokeWidth={1.8} />
              </div>
            </div>

            <Large className="mt-5 block text-3xl font-bold text-[#24352F]">
              {stats[stat.key]}
            </Large>

            <P className="mt-2 text-xs text-[#84938C]">{stat.description}</P>
          </div>
        );
      })}
    </div>
  );
}
