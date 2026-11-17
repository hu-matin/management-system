import DashboardLayout from "@/components/layout/DashboardLayout";
import RequestDetailsPageContent from "@/features/requests/components/RequestDetailsPageContent";

export default function RequestDetailsPage() {
  return (
    <DashboardLayout
      title="جزئیات درخواست"
      description="مشاهده اطلاعات کامل درخواست"
    >
      <div className="mx-auto w-full max-w-5xl">
        <RequestDetailsPageContent />
      </div>
    </DashboardLayout>
  );
}
