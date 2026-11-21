import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  Bookmark,
  CheckCircle2,
  Clock3,
  CreditCard,
  Crown,
  FileText,
  LayoutDashboard,
  Plus,
  Users,
} from "lucide-react";

const overviewContent = {
  student: {
    title: "Student Dashboard",
    description: "Track your tuition applications and learning journey.",
    primaryAction: {
      label: "Browse Tuitions",
      href: "/tuitions",
      icon: BookOpenCheck,
    },
    stats: [
      { label: "Applied Tuitions", note: "Your applications", icon: FileText },
      { label: "Accepted", note: "Ready to get started", icon: BookOpenCheck },
      { label: "Pending", note: "Awaiting a response", icon: Clock3 },
      { label: "Current Plan", note: "Your plan overview", icon: CreditCard },
    ],
    sectionTitle: "Quick Actions",
    actions: [
      {
        label: "My Applications",
        note: "Track and manage submissions",
        href: "/dashboard/student/applications",
        icon: FileText,
      },
      {
        label: "Saved Tuitions",
        note: "View your saved listings",
        href: "/dashboard/student/saved",
        icon: Bookmark,
      },
    ],
  },
  tutor: {
    title: "Tutor Dashboard",
    description: "Track your tuition listings and incoming student applicants.",
    primaryAction: {
      label: "Post New Tuition",
      href: "/dashboard/tutor/post-tuition",
      icon: Plus,
    },
    stats: [
      {
        label: "Total Tuitions",
        value: "12",
        badge: "∞ Pro",
        note: "Unlimited posts unlocked",
        icon: BookOpenCheck,
        tone: "indigo",
      },
      {
        label: "Active & Approved",
        value: "11",
        note: "Publicly listed and accepting students",
        icon: CheckCircle2,
        tone: "indigo",
      },
      {
        label: "Total Applicants",
        value: "7",
        note: "Interested students applied across all posts",
        icon: Users,
        tone: "indigo",
      },
      {
        label: "Current Plan",
        value: "PRO",
        note: "Priority listing in searches",
        icon: Crown,
        tone: "amber",
      },
    ],
    sectionTitle: "Tutor Controls",
    actions: [
      {
        label: "Post New Tuition",
        note: "Create a new course offering",
        href: "/dashboard/tutor/post-tuition",
        icon: Plus,
        tone: "indigo",
      },
      {
        label: "My Tuitions",
        note: "Edit, activate, or delete posts",
        href: "/dashboard/tutor/my-tuitions",
        icon: BookOpenCheck,
        tone: "blue",
      },
      {
        label: "Manage Applicants",
        note: "Accept or reject students",
        href: "/dashboard/tutor/applicants",
        icon: Users,
        tone: "violet",
      },
    ],
  },
  admin: {
    title: "Admin Dashboard",
    description: "Overview of platform users, tuition listings, and transactions.",
    primaryAction: {
      label: "Review Tuitions",
      href: "/dashboard/admin/tuitions",
      icon: BookOpenCheck,
    },
    stats: [
      { label: "Total Users", note: "Platform user overview", icon: Users },
      { label: "Tuitions", note: "Tuition listing overview", icon: BookOpenCheck },
      { label: "Transactions", note: "Transaction overview", icon: CreditCard },
      { label: "Pending Review", note: "Moderation overview", icon: Clock3 },
    ],
    sectionTitle: "Platform Management",
    actions: [
      {
        label: "Manage Users",
        note: "View platform users",
        href: "/dashboard/admin/users",
        icon: Users,
      },
      {
        label: "Review Tuitions",
        note: "Open tuition moderation",
        href: "/dashboard/admin/tuitions",
        icon: BookOpenCheck,
      },
      {
        label: "Transactions",
        note: "View transaction records",
        href: "/dashboard/admin/transactions",
        icon: CreditCard,
      },
    ],
  },
};

export default function DashboardOverview({ role, userName }) {
  const content = overviewContent[role] || overviewContent.student;
  const PrimaryIcon = content.primaryAction.icon;
  const isTutor = role === "tutor";

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {content.title}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {isTutor
              ? `Welcome back${userName ? `, ${userName}` : ""}! Track your tuition listings and incoming student applicants.`
              : content.description}
          </p>
        </div>
        <Link
          href={content.primaryAction.href}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
        >
          <PrimaryIcon aria-hidden="true" className="size-4" />
          {content.primaryAction.label}
        </Link>
      </div>

      <section
        aria-label="Dashboard overview"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {content.stats.map(({ label, value, badge, note, icon: Icon, tone }) => (
          <article
            key={label}
            className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30 ${
              isTutor ? "min-h-[168px]" : ""
            }`}
          >
            {isTutor ? (
              <>
                <div className="flex items-start justify-between gap-3">
                  <p className="pt-2 text-sm text-slate-500">{label}</p>
                  <span
                    className={`grid size-10 place-items-center rounded-xl ${
                      tone === "amber"
                        ? "bg-amber-50 text-amber-500"
                        : "bg-indigo-50 text-indigo-600"
                    }`}
                  >
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <p className="text-3xl font-bold tracking-tight text-slate-900">
                    {value}
                  </p>
                  {badge && (
                    <span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-600">
                      {badge}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>
              </>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                    Overview
                  </span>
                </div>
                <p className="mt-5 text-sm font-medium text-slate-500">{label}</p>
                <div className="mt-1 flex items-baseline justify-between gap-3">
                  <p className="text-3xl font-bold tracking-tight text-slate-900">
                    —
                  </p>
                  <p className="text-right text-xs text-slate-400">{note}</p>
                </div>
              </>
            )}
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/30 sm:p-7">
        <h3 className="border-b border-slate-100 pb-3 text-lg font-bold text-slate-900">
          {content.sectionTitle}
        </h3>
        <div className="mt-4 grid gap-3">
          {content.actions.map(({ label, note, href, icon: Icon, tone }) => {
            const actionContent = (
              <>
                <span
                  className={`grid size-10 place-items-center rounded-xl ${
                    tone === "blue"
                      ? "bg-blue-50 text-blue-600"
                      : tone === "violet"
                        ? "bg-violet-50 text-violet-600"
                        : isTutor
                          ? "bg-indigo-50 text-indigo-600"
                          : "bg-indigo-50 text-indigo-600"
                  }`}
                >
                  <Icon aria-hidden="true" className="size-[18px]" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-800">
                    {label}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    {note}
                  </span>
                </span>
                {isTutor ? (
                  <ArrowRight
                    aria-hidden="true"
                    className="ml-auto size-4 text-slate-400"
                  />
                ) : (
                  <ArrowUpRight
                    aria-hidden="true"
                    className="ml-auto size-4 text-slate-400"
                  />
                )}
              </>
            );
            const className =
              "flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3";

            return href ? (
              <Link
                key={label}
                href={href}
                className={`${className} transition ${
                  isTutor
                    ? "hover:border-indigo-200 hover:bg-indigo-50/30"
                    : "hover:border-indigo-200 hover:bg-indigo-50/30"
                }`}
              >
                {actionContent}
              </Link>
            ) : (
              <div key={label} className={className}>
                {actionContent}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
