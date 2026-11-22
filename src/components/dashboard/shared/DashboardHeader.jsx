"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const roleHeaderContent = {
  admin: {
    workspace: "Admin Workspace",
    account: "Admin account",
    initials: "A",
    roleLabel: "Admin",
  },
  tutor: {
    workspace: "Tutor Workspace",
    account: "Tutor account",
    initials: "T",
    roleLabel: "Tutor",
  },
  student: {
    workspace: "Student Workspace",
    account: "Student account",
    initials: "S",
    roleLabel: "Student",
  },
};

export default function DashboardHeader({ role = "student" }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const currentRole = roleHeaderContent[role] ? role : "student";
  const { workspace, roleLabel } = roleHeaderContent[currentRole];
  const account =
    user?.name || user?.email || `${roleLabel} account`;
  const initials = (
    user?.name?.trim()?.charAt(0) ||
    user?.email?.trim()?.charAt(0) ||
    roleLabel.charAt(0)
  ).toUpperCase();

  return (
    <header className="border-b border-slate-200/80 bg-white">
      <div className="flex min-h-14 items-center justify-between gap-4 px-5 sm:px-8 lg:px-5">
        <h1 className="text-[15px] font-bold text-slate-900">{workspace}</h1>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/profile"
            aria-label="View my profile"
            className="flex items-center gap-2 rounded-full transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span className="grid size-9 place-items-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
              {initials}
            </span>
            <span className="hidden text-xs font-semibold text-slate-800 sm:block">
              {account}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
