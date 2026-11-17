
"use client";

import { useState, type ReactNode } from "react";
import Sidebar from "./slidbar/index";
import Header from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export default function DashboardLayout({
  children,
  title,
  description,
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div dir="rtl" className="min-h-screen bg-[#F4F7F5]">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="بستن منو"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      <div className="min-h-screen lg:mr-64">
        <Header
          title={title}
          description={description}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="px-5 py-6 sm:px-8 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
