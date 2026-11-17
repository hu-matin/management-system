import { LogOut } from "lucide-react";
import { P } from "@/components/Ui/typography/Typography";

export default function SidebarLogout() {
  return (
    <div className="border-t border-[#E5ECE8] pt-5">
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-xl p-3 text-[#84938C] transition-colors hover:bg-red-50 hover:text-[#D65B5B]"
      >
        <LogOut size={20} />

        <P className="text-sm font-medium">خروج از سیستم</P>
      </button>
    </div>
  );
}
