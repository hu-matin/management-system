"use client";

import { X } from "lucide-react";
import SidebarLogo from "./SidebarLogo";
import SidebarMenu from "./SidebarMenu";
import SidebarLogout from "./SidebarLogout";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside
      className={`fixed right-0 top-0 z-50 flex h-screen w-64 flex-col border-l border-[#E5ECE8] bg-[#FCFDFC] px-5 py-6 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="mb-5 flex items-center justify-between">
        <SidebarLogo />

        <button
          type="button"
          onClick={onClose}
          aria-label="بستن منو"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#84938C] hover:bg-[#F4F7F5] lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <SidebarMenu onClose={onClose} />

      <SidebarLogout />
    </aside>
  );
}
