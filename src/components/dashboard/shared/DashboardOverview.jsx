import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenCheck,
  Bookmark,
  Clock3,
  CreditCard,
  FileText,
  LayoutDashboard,
  Plus,
  Users,
} from "lucide-react";

const overviewContent = {
  student: {
    title: "Student Dashboard",
    description: "Track your tuition applications and learning journey.",
    primaryAction: { label: "Browse Tuitions", href: "/tuitions", icon: BookOpenCheck },
    stats: [
      { label: "Applied Tuitions", note: "Your applications", icon: FileText },
      { label: "Accepted", note: "Ready to get started", icon: BookOpenCheck },
      { label: "Pending", note: "Awaiting a response", icon: Clock3 },
      { label: "Current Plan", note: "Your plan overview", icon: CreditCard },
    ],
    sectionTitle: "Quick Actions",
    actions: [
      { label: "My Applications", note: "Track and manage submissions", href: "/dashboard/student/applications", icon: FileText },
      { label: "Saved Tuitions", note: "View your saved listings", href: "/dashboard/student/saved", icon: Bookmark },
    ],
  },
  tutor: {
    title: "Tutor Dashboard",
    description: "Manage your tuition listings and student applicants.",
    primaryAction: { label: "Post New Tuition", href: "/dashboard/tutor/post", icon: Plus },
    stats: [
      { label: "Total Tuitions", note: "Your listing overview", icon: BookOpenCheck },
      { label: "Active & Approved", note: "Your active listings", icon: LayoutDashboard },
      { label: "Total Applicants", note: "Applicants across your posts", icon: Users },
      { label: "Current Plan", note: "Your plan overview", icon: CreditCard },
    ],
    sectionTitle: "Tutor Controls",
    actions: [
      { label: "My Tuitions", note: "Review your tuition listings", href: "/dashboard/tutor/my-tuitions", icon: BookOpenCheck },
      { label: "Manage Applicants", note: "View student applications", href: "/dashboard/tutor/applicants", icon: Users },
    ],
  },
  admin: {
    title: "Admin Dashboard",
    description: "Overview of platform users, tuition listings, and transactions.",
    primaryAction: { label: "Review Tuitions", href: "/dashboard/admin/tuitions", icon: BookOpenCheck },
    stats: [
      { label: "Total Users", note: "Platform user overview", icon: Users },
      { label: "Tuitions", note: "Tuition listing overview", icon: BookOpenCheck },
      { label: "Transactions", note: "Transaction overview", icon: CreditCard },
      { label: "Pending Review", note: "Moderation overview", icon: Clock3 },
    ],
    sectionTitle: "Platform Management",
    actions: [
      { label: "Manage Users", note: "View platform users", href: "/dashboard/admin/users", icon: Users },
      { label: "Review Tuitions", note: "Open tuition moderation", href: "/dashboard/admin/tuitions", icon: BookOpenCheck },
      { label: "Transactions", note: "View transaction records", href: "/dashboard/admin/transactions", icon: CreditCard },
    ],
  },
};

export default function DashboardOverview({ role }) {
  const content = overviewContent[role] || overviewContent.student;
  const PrimaryIcon = content.primaryAction.icon;

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {content.title}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{content.description}</p>
        </div>
        <Link
          href={content.primaryAction.href}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
        >
          <PrimaryIcon aria-hidden="true" className="size-4" />
          {content.primaryAction.label}
        </Link>
      </div>

      <section aria-label="Dashboard overview" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {content.stats.map(({ label, note, icon: Icon }) => (
          <article
            key={label}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30"
          >
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
              <p className="text-3xl font-bold tracking-tight text-slate-900">—</p>
              <p className="text-right text-xs text-slate-400">{note}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/30 sm:p-7">
        <h3 className="text-lg font-bold text-slate-900">{content.sectionTitle}</h3>
        <div className="mt-5 grid gap-3">
          {content.actions.map(({ label, note, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 transition hover:border-indigo-200 hover:bg-indigo-50/30"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                <Icon aria-hidden="true" className="size-[18px]" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-800">{label}</span>
                <span className="mt-0.5 block text-xs text-slate-500">{note}</span>
              </span>
              <ArrowUpRight aria-hidden="true" className="ml-auto size-4 text-slate-400" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
