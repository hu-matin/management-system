"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Plus,
  ChartNoAxesColumn,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Span } from "@/components/Ui/typography/Typography";

const icons = {
  dashboard: LayoutDashboard,
  requests: ClipboardList,
  plus: Plus,
  reports: ChartNoAxesColumn,
};

interface SidebarMenuItemProps {
  title: string;
  href: string;
  icon: keyof typeof icons;
  onClose: () => void;
}

function SidebarMenuItemContent({
  title,
  href,
  icon,
  onClose,
}: SidebarMenuItemProps) {
  const pathname = usePathname();
  const Icon = icons[icon];

  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClose}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-3 transition-colors",
        isActive
          ? "bg-[#E8F3EF] text-[#287C68]"
          : "text-[#84938C] hover:bg-[#F4F7F5] hover:text-[#174E43]",
      )}
    >
      <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />

      <Span
        className={cn("text-sm", isActive ? "font-semibold" : "font-medium")}
      >
        {title}
      </Span>
    </Link>
  );
}

export default function SidebarMenuItem(props: SidebarMenuItemProps) {
  return (
    <Suspense fallback={null}>
      <SidebarMenuItemContent {...props} />
    </Suspense>
  );
}
