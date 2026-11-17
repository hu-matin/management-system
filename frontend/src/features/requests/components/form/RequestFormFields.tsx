import type { FieldErrors, UseFormRegister } from "react-hook-form";

import {
  P,
  Small,
  InputErrorMassage,
} from "@/components/Ui/typography/Typography";

import type { RequestFormValues } from "../../validation/request.schema";

interface RequestFormFieldsProps {
  register: UseFormRegister<RequestFormValues>;
  errors: FieldErrors<RequestFormValues>;
}

const inputClassName =
  "w-full rounded-xl border border-[#E5ECE8] bg-[#FCFDFC] px-4 py-3 text-sm text-[#24352F] outline-none transition placeholder:text-[#A0ACA6] focus:border-[#287C68]";

export default function RequestFormFields({
  register,
  errors,
}: RequestFormFieldsProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="block text-[#24352F]">
          <Small>عنوان درخواست</Small>
        </label>

        <input
          {...register("title")}
          placeholder="عنوان درخواست را وارد کنید"
          className={inputClassName}
        />

        <InputErrorMassage className="text-red-500">{errors.title?.message}</InputErrorMassage>
      </div>

      <div className="space-y-2">
        <label className="block text-[#24352F]">
          <Small>نام درخواست‌دهنده</Small>
        </label>

        <input
          {...register("requester")}
          placeholder="نام درخواست‌دهنده را وارد کنید"
          className={inputClassName}
        />

        <InputErrorMassage className="text-red-500">{errors.requester?.message}</InputErrorMassage>
      </div>

      <div className="space-y-2">
        <label className="block text-[#24352F]">
          <Small>توضیحات درخواست</Small>
        </label>

        <textarea
          {...register("description")}
          rows={5}
          placeholder="توضیحات درخواست را وارد کنید"
          className={`${inputClassName} resize-y`}
        />

        <InputErrorMassage className="text-red-500">{errors.description?.message}</InputErrorMassage>
      </div>

      <div className="space-y-2">
        <label className="block text-[#24352F]">
          <Small>اولویت درخواست</Small>
        </label>

        <select {...register("priority")} className={inputClassName}>
          <option value="low">کم</option>
          <option value="medium">متوسط</option>
          <option value="high">زیاد</option>
        </select>

        <InputErrorMassage className="bg-red-500">{errors.priority?.message}</InputErrorMassage>
      </div>
    </div>
  );
}
