"use client";

import { useParams, useRouter } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {  P } from "@/components/Ui/typography/Typography";

import RequestForm from "@/features/requests/components/form/RequestForm";
import useRequestDetails from "@/features/requests/hook/useRequestDetails";
import useUpdateRequest from "@/features/requests/hook/useUpdateRequest";

import type { RequestFormValues } from "@/features/requests/validation/request.schema";

export default function EditRequestPageContent() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const id = Number(params.id);

  const {
    request,
    loading: detailsLoading,
    error,
  } = useRequestDetails(params.id);

  const { updateRequest, loading: updateLoading } = useUpdateRequest();

  const handleUpdate = async (values: RequestFormValues) => {
    if (!request) return;

    const success = await updateRequest(id, {
      ...values,
      expected_version: request.version,
    });

    if (success) {
      router.push(`/requests/${id}`);
      router.refresh();
    }
  };

  return (
    <DashboardLayout
      title="ویرایش درخواست"
      description="ویرایش اطلاعات درخواست"
    >
      <div className="mx-auto w-full max-w-3xl space-y-5">
        {detailsLoading ? (
          <div className="h-80 animate-pulse rounded-2xl bg-[#E5ECE8]" />
        ) : error || !request || !Number.isInteger(id) || id <= 0 ? (
          <div className="rounded-2xl border border-[#E5ECE8] bg-[#FCFDFC] p-6 text-center">
            <P className="text-[#D65B5B]">
              دریافت اطلاعات درخواست با خطا مواجه شد.
            </P>
          </div>
        ) : (
          <RequestForm
            mode="edit"
            loading={updateLoading}
            cancelHref={`/requests/${id}`}
            initialValues={{
              title: request.title,
              description: request.description,
              requester: request.requester,
              priority: request.priority,
            }}
            onSubmit={handleUpdate}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
