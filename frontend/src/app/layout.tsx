import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "  مدیریت درخواست‌ها",
  description: "سامانه مدیریت و پیگیری درخواست‌ها",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
