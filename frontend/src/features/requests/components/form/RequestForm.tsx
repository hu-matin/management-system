"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { H2, P, Small } from "@/components/Ui/typography/Typography";

import RequestFormFields from "./RequestFormFields";
import RequestFormActions from "./RequestFormActions";

import {
  requestSchema,
  type RequestFormValues,
} from "../../validation/request.schema";

const DRAFT_KEY = "request-create-draft";

const emptyValues: RequestFormValues = {
  title: "",
  description: "",
  requester: "",
  priority: "medium",
};

interface RequestFormProps {
  mode: "create" | "edit";
  initialValues?: RequestFormValues;
  loading: boolean;
  cancelHref: string;
  onSubmit: (values: RequestFormValues) => Promise<void>;
}

export default function RequestForm({
  mode,
  initialValues,
  loading,
  cancelHref,
  onSubmit,
}: RequestFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: initialValues ?? emptyValues,
  });

  const watchedValues = useWatch({ control });

  const [draftReady, setDraftReady] = useState(mode !== "create");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );

  // بازیابی پیش‌نویس هنگام ورود به صفحه ایجاد درخواست
  useEffect(() => {
    if (mode !== "create") return;

    try {
      const savedDraft = localStorage.getItem(DRAFT_KEY);

      if (savedDraft) {
        const parsedDraft: unknown = JSON.parse(savedDraft);
        const result = requestSchema.safeParse(parsedDraft);

        if (result.success) {
          reset(result.data);
          toast.info("پیش‌نویس قبلی شما بازیابی شد.");
          setSaveStatus("saved");
        } else {
          localStorage.removeItem(DRAFT_KEY);
        }
      }
    } catch {
      toast.error("بازیابی پیش‌نویس امکان‌پذیر نبود.");
    } finally {
      setDraftReady(true);
    }
  }, [mode, reset]);

  // ذخیره خودکار پیش‌نویس با یک ثانیه تأخیر
  useEffect(() => {
    if (mode !== "create" || !draftReady) return;

    const hasContent = Boolean(
      watchedValues?.title?.trim() ||
      watchedValues?.description?.trim() ||
      watchedValues?.requester?.trim(),
    );

    if (!hasContent) {
      localStorage.removeItem(DRAFT_KEY);
      setSaveStatus("idle");
      return;
    }

    setSaveStatus("saving");

    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(watchedValues));

        setSaveStatus("saved");
      } catch {
        setSaveStatus("idle");
        toast.error("ذخیره پیش‌نویس انجام نشد.");
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [watchedValues, mode, draftReady]);

  // فرم ویرایش: دریافت اطلاعات اولیه
  useEffect(() => {
    if (mode === "edit" && initialValues) {
      reset(initialValues);
    }
  }, [mode, initialValues, reset]);

  // پاک کردن پیش‌نویس و خالی کردن فرم
  const handleClearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    reset(emptyValues);
    setSaveStatus("idle");
    toast.success("پیش‌نویس پاک شد.");
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode === "edit" && !isDirty) {
      toast.warning("لطفاً حداقل یک فیلد را تغییر دهید.");
      return;
    }

    await handleSubmit(onSubmit)();
  };

  return (
    <section className="rounded-2xl border border-[#E5ECE8] bg-[#FCFDFC] p-4 sm:p-7">
      <div className="mb-6 border-b border-[#E5ECE8] pb-5">
        <H2 className="pb-2 text-[#24352F]">
          {mode === "create"
            ? "اطلاعات درخواست جدید"
            : "ویرایش اطلاعات درخواست"}
        </H2>

     
        {mode === "create" && (
          <div className="mt-3 flex items-center justify-between gap-3">
            <Small className="text-[#84938C]">
              {saveStatus === "saving" && "در حال ذخیره پیش‌نویس..."}
              {saveStatus === "saved" && "پیش‌نویس ذخیره شد"}
              {saveStatus === "idle" && "ذخیره خودکار فعال است"}
            </Small>

            {saveStatus !== "idle" && (
              <button
                type="button"
                onClick={handleClearDraft}
                className="text-sm text-[#D65B5B] hover:underline"
              >
                پاک کردن پیش‌نویس
              </button>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <RequestFormFields register={register} errors={errors} />

        <RequestFormActions
          loading={loading}
          mode={mode}
          cancelHref={cancelHref}
        />
      </form>
    </section>
  );
}
