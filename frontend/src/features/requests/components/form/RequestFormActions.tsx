import Link from "next/link";

import { Span } from "@/components/Ui/typography/Typography";

interface RequestFormActionsProps {
  loading: boolean;
  mode: "create" | "edit";
  cancelHref: string;
}

export default function RequestFormActions({
  loading,
  mode,
  cancelHref,
}: RequestFormActionsProps) {
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-[#E5ECE8] pt-5 sm:flex-row sm:justify-end">
      <Link
        href={cancelHref}
        className="rounded-xl border border-[#E5ECE8] px-5 py-3 text-center text-[#84938C] transition hover:bg-[#F4F7F5]"
      >
        <Span>انصراف</Span>
      </Link>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-[#287C68] px-6 py-3 text-white transition hover:bg-[#174E43] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Span>
          {loading
            ? "در حال ذخیره..."
            : mode === "create"
              ? "ثبت درخواست"
              : "ذخیره تغییرات"}
        </Span>
      </button>
    </div>
  );
}
