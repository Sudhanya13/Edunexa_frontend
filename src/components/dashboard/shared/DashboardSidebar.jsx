"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Bookmark,
  BookOpenCheck,
  LayoutDashboard,
  Plus,
  Settings,
  UserRound,
  Users,
  WalletCards,
} from "lucide-react";

const roleBasedSidebarItems = {
  student: {
    main: [
      { label: "Overview", href: "/dashboard/student", icon: LayoutDashboard },
      {
        label: "My Applications",
        href: "/dashboard/student/applications",
        icon: BookOpenCheck,
      },
      {
        label: "Saved Tuitions",
        href: "/dashboard/student/saved",
        icon: Bookmark,
      },
    ],
    preferences: [{ label: "Update Profile", href: "/profile", icon: Settings }],
  },
  tutor: {
    main: [
      { label: "Overview", href: "/dashboard/tutor", icon: LayoutDashboard },
      {
        label: "Post Tuition",
        href: "/dashboard/tutor/post",
        icon: Plus,
      },
      {
        label: "My Tuitions",
        href: "/dashboard/tutor/my-tuitions",
        icon: BookOpenCheck,
      },
      {
        label: "Applicants",
        href: "/dashboard/tutor/applicants",
        icon: Users,
      },
    ],
    preferences: [{ label: "Update Profile", href: "/profile", icon: Settings }],
  },
  admin: {
    main: [
      { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
      { label: "Users", href: "/dashboard/admin/users", icon: Users },
      {
        label: "Tuitions",
        href: "/dashboard/admin/tuitions",
        icon: BookOpenCheck,
      },
      {
        label: "Transactions",
        href: "/dashboard/admin/transactions",
        icon: WalletCards,
      },
    ],
    preferences: [{ label: "Update Profile", href: "/profile", icon: Settings }],
  },
};

export default function DashboardSidebar({ role = "student" }) {
  const pathname = usePathname();
  const { main, preferences } =
    roleBasedSidebarItems[role] || roleBasedSidebarItems.student;
  const roleTitle = role.charAt(0).toUpperCase() + role.slice(1);
  const initials = roleTitle.charAt(0);

  return (
    <aside className="border-b border-slate-200 bg-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[270px] lg:shrink-0 lg:flex-col lg:border-r lg:border-b-0">
      <div className="flex items-center justify-between px-5 py-4 sm:px-8 lg:block lg:px-6 lg:py-7">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/edunexa-logo.svg"
            alt=""
            width={38}
            height={38}
            className="size-[38px]"
          />
          <span className="text-xl font-extrabold tracking-tight text-slate-950">
            Edunexa
          </span>
        </Link>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 lg:hidden">
          {roleTitle}
        </span>
      </div>

      <div className="hidden px-6 pb-5 lg:block">
        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-100 text-sm font-bold text-indigo-700">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {roleTitle} account
            </p>
            <p className="mt-0.5 text-xs text-slate-500">Free plan</p>
          </div>
          <span className="ml-auto rounded-full bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
            {roleTitle}
          </span>
        </div>
      </div>

      <nav
        aria-label="Dashboard navigation"
        className="flex gap-1 overflow-x-auto px-4 pb-4 sm:px-7 lg:flex-1 lg:flex-col lg:overflow-visible lg:px-4 lg:pb-6"
      >
        <p className="hidden px-3 pb-2 pt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 lg:block">
          Main Menu
        </p>
        {main.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors lg:w-full ${
                active
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              <Icon aria-hidden="true" className="size-[18px]" />
              <span>{label}</span>
            </Link>
          );
        })}
        <p className="hidden px-3 pb-2 pt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 lg:block">
          Preferences
        </p>
        {preferences.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors lg:w-full ${
                active
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              <Icon aria-hidden="true" className="size-[18px]" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="hidden px-4 pb-5 lg:block">
        <Link
          href="/pricing"
          className="group relative block overflow-hidden rounded-2xl bg-slate-950 p-4 text-white"
        >
          <span className="absolute -right-7 -top-8 size-24 rounded-full bg-indigo-500/30 blur-2xl" />
          <span className="relative flex items-center justify-between">
            <span className="rounded-lg bg-white/10 p-2 text-indigo-200">
              <BookOpenCheck aria-hidden="true" className="size-4" />
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
          <span className="relative mt-4 block text-sm font-bold">
            Make more progress
          </span>
          <span className="relative mt-1 block text-xs leading-5 text-slate-300">
            Explore plans designed for your learning goals.
          </span>
          <span className="relative mt-3 inline-block text-xs font-semibold text-indigo-200">
            Explore plans
          </span>
        </Link>
        <p className="px-2 pt-5 text-xs text-slate-400">Learn at your pace.</p>
      </div>
    </aside>
  );
}
