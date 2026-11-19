"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/ui/shared/Footer";
import Navbar from "@/components/ui/shared/Navbar";

const authRoutes = ["/signin", "/signup"];

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isDashboardRoute =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const showChrome = !authRoutes.includes(pathname) && !isDashboardRoute;

  return (
    <div className="flex min-h-screen flex-col">
      {showChrome && <Navbar />}
      <div className="flex-1">{children}</div>
      {showChrome && <Footer />}
    </div>
  );
}
