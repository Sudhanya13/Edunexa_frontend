import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const role = session?.user?.role?.toLowerCase();

  if (role === "tutor" || role === "admin") {
    redirect(`/dashboard/${role}`);
  }

  redirect("/dashboard/student");
}
