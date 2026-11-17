"use client";

import { useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { H2, P } from "@/components/Ui/typography/Typography";

import DashboardStats from "@/features/dashboard/components/DashboardStats";
import RecentRequests from "@/features/dashboard/components/RecentRequests";
import type { RequestStatus } from "@/features/requests/types/request";

export default function HomePage() {
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus | null>(
    null,
  );

  return (
    <DashboardLayout title="داشبورد">
      <section className="space-y-6">
        <div>
          <H2 className="text-lg font-bold text-[#24352F]">خلاصه وضعیت</H2>

          <P className="mt-1 text-sm text-[#84938C]">
            آخرین وضعیت درخواست‌های ثبت‌شده در سیستم
          </P>
        </div>

        <DashboardStats
          selectedStatus={selectedStatus}
          onSelect={setSelectedStatus}
        />

        <RecentRequests key={selectedStatus ?? "all"} status={selectedStatus} />
      </section>
    </DashboardLayout>
  );
}
