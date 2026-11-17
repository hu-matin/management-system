import DashboardLayout from "@/components/layout/DashboardLayout";
import { H2, P } from "@/components/Ui/typography/Typography";

import DashboardStats from "@/features/dashboard/components/DashboardStats";
import RecentRequests from "@/features/dashboard/components/RecentRequests";

export default function HomePage() {
  return (
    <DashboardLayout title="داشبورد">
      <section className="space-y-6">
        <div>
          <H2 className="text-lg font-bold text-[#24352F]">خلاصه وضعیت</H2>

          <P className="mt-1 text-sm text-[#84938C]">
            آخرین وضعیت درخواست‌های ثبت‌شده در سیستم
          </P>
        </div>

        <DashboardStats />

        <RecentRequests />
      </section>
    </DashboardLayout>
  );
}
