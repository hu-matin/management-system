"use client";

import { useRouter } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { P } from "@/components/Ui/typography/Typography";

import RequestForm from "@/features/requests/components/form/RequestForm";
import useCreateRequest from "@/features/requests/hook/useCreateRequest";

import type { RequestFormValues } from "@/features/requests/validation/request.schema";

export default function CreateRequestPage() {
  const router = useRouter();

  const { createRequest, loading } = useCreateRequest();

  const handleCreate = async (values: RequestFormValues) => {
    const success = await createRequest(values);

    if (success) {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <DashboardLayout title="درخواست جدید" description="ثبت درخواست جدید">
      <div className="mx-auto w-full max-w-3xl space-y-5">

        <RequestForm
          mode="create"
          loading={loading}
          cancelHref="/"
          onSubmit={handleCreate}
        />
      </div>
    </DashboardLayout>
  );
}
