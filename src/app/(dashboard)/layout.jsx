"use client";

import { usePathname } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/shared/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/shared/DashboardHeader";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const pathRole = pathname.split("/").filter(Boolean)[1];
  const role = ["admin", "tutor", "student"].includes(pathRole)
    ? pathRole
    : "student";

  return (
    <div className="min-h-screen bg-[#f7f8fc] lg:flex">
      <DashboardSidebar role={role} />

      <div className="min-w-0 flex-1">
        <DashboardHeader role={role} />

        <main className="mx-auto w-full max-w-[1440px] px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
