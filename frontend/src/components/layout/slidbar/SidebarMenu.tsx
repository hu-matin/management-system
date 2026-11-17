
import { Muted } from "@/components/Ui/typography/Typography";
import SidebarMenuItem from "./SidebarMenuItem";
import { sidebarMenuItems } from "./sidebar.data";

interface SidebarMenuProps {
  onClose: () => void;
}

export default function SidebarMenu({ onClose }: SidebarMenuProps) {
  return (
    <nav className="flex-1 space-y-2">
      <Muted className="mb-4 px-3 text-xs font-semibold">
        منوی اصلی
      </Muted>

      {sidebarMenuItems.map((item) => (
        <SidebarMenuItem
          key={item.href}
          {...item}
          onClose={onClose}
        />
      ))}
    </nav>
  );
}
