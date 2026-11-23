"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function TutorDashboardLayout({ children }) {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();
  const userRole = session?.user?.role?.toLowerCase();

  useEffect(() => {
    if (sessionLoading) return;

    if (!session?.user) {
      router.replace("/signin");
      return;
    }

    if (userRole !== "tutor") {
      router.replace("/dashboard");
    }
  }, [sessionLoading, session, userRole, router]);

  if (sessionLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!session?.user || userRole !== "tutor") {
    return null;
  }

  return children;
}
