import { ClipboardList } from "lucide-react";
import { H3, Small } from "@/components/Ui/typography/Typography";

export default function SidebarLogo() {
  return (
    <div className="mb-10 flex items-center gap-3 px-2">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#174E43] text-white">
        <ClipboardList size={23} />
      </div>

      <Small className="text-[#84938C]">سامانه سلامت</Small>
    </div>
  );
}
