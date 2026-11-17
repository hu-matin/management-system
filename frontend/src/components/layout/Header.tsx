
"use client";

import { Menu, Search } from "lucide-react";
import { H2, P } from "@/components/Ui/typography/Typography";

interface HeaderProps {
  title: string;
  description?: string;
  onMenuClick: () => void;
}

export default function Header({
  title,
  description,
  onMenuClick,
}: HeaderProps) {
  return (
    <header className="border-b border-[#E5ECE8] bg-[#FCFDFC] px-5 py-5 sm:px-8 lg:px-10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="باز کردن منو"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E5ECE8] text-[#287C68] transition hover:bg-[#E8F3EF] lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="min-w-0">
            <H2 className="text-xl font-bold text-[#24352F] sm:text-2xl">
              {title}
            </H2>

            {description && (
              <P className="mt-1 text-sm text-[#84938C]">
                {description}
              </P>
            )}
          </div>
        </div>

        <div className="relative hidden min-w-0 sm:block sm:w-64 sm:shrink-0">
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#84938C]"
          />

          <input
            type="text"
            placeholder="جستجو در درخواست‌ها..."
            className="w-full rounded-xl border border-[#E5ECE8] bg-[#F4F7F5] py-3 pr-10 pl-4 text-sm text-[#24352F] outline-none transition placeholder:text-[#A4B0AA] focus:border-[#287C68] focus:bg-white focus:ring-2 focus:ring-[#287C68]/10"
          />
        </div>
      </div>
    </header>
  );
}
