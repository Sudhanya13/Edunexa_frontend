import {
  ArrowUpRight,
  BookOpenCheck,
  CalendarDays,
  Clock3,
  Compass,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const overviewStats = [
  {
    label: "Applied tuitions",
    value: "—",
    note: "Your applications",
    icon: BookOpenCheck,
    tone: "bg-indigo-50 text-indigo-600",
  },
  {
    label: "Accepted",
    value: "—",
    note: "Ready to get started",
    icon: Sparkles,
    tone: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Pending",
    value: "—",
    note: "Awaiting a response",
    icon: Clock3,
    tone: "bg-amber-50 text-amber-600",
  },
  {
    label: "Current plan",
    value: "Free",
    note: "A great place to begin",
    icon: CalendarDays,
    tone: "bg-sky-50 text-sky-600",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 px-6 py-8 text-white shadow-xl shadow-indigo-200/50 sm:px-9 sm:py-10">
        <div className="absolute -right-10 -top-20 size-64 rounded-full border-[36px] border-white/[0.07]" />
        <div className="absolute -bottom-28 right-40 size-64 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-indigo-50 ring-1 ring-white/15">
            <Sparkles aria-hidden="true" className="size-3.5" />
            Your learning space
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome to your dashboard
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
            Keep your learning journey moving. Explore tuition opportunities
            and manage your applications from one place.
          </p>
          <Link
            href="/tuitions"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
          >
            Explore tuitions
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="relative mt-8 flex items-center gap-3 border-t border-white/15 pt-5 text-xs text-indigo-100 sm:absolute sm:bottom-8 sm:right-8 sm:mt-0 sm:border-0 sm:pt-0">
          <span className="grid size-9 place-items-center rounded-xl bg-white/15">
            <Compass aria-hidden="true" className="size-[18px]" />
          </span>
          <span>Find a tutor who fits your goals</span>
        </div>
      </section>

      <section aria-labelledby="overview-heading">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">A quick snapshot</p>
            <h2
              id="overview-heading"
              className="mt-1 text-xl font-bold tracking-tight text-slate-900"
            >
              Your overview
            </h2>
          </div>
          <span className="hidden text-xs font-medium text-slate-400 sm:block">
            Your activity will show here
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {overviewStats.map(({ label, value, note, icon: Icon, tone }) => (
            <article
              key={label}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`grid size-11 place-items-center rounded-xl ${tone}`}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span className="mt-1 rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                  Overview
                </span>
              </div>
              <p className="mt-5 text-sm font-medium text-slate-500">{label}</p>
              <div className="mt-1 flex items-baseline justify-between gap-3">
                <p className="text-3xl font-bold tracking-tight text-slate-900">
                  {value}
                </p>
                <p className="text-right text-xs text-slate-400">{note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <article
          id="applications"
          className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/30 sm:p-7"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Stay on track</p>
              <h2 className="mt-1 text-lg font-bold text-slate-900">
                Recent applications
              </h2>
            </div>
            <span className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
              <BookOpenCheck aria-hidden="true" className="size-[18px]" />
            </span>
          </div>
          <div className="mt-6 flex min-h-36 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-5 text-center">
            <span className="grid size-10 place-items-center rounded-full bg-white text-slate-400 shadow-sm">
              <CalendarDays aria-hidden="true" className="size-[18px]" />
            </span>
            <p className="mt-3 text-sm font-semibold text-slate-700">
              Your activity will appear here
            </p>
            <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
              Once you apply for a tuition, you can follow its progress from
              your dashboard.
            </p>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/30 sm:p-7">
          <p className="text-sm font-medium text-slate-500">A good next step</p>
          <h2 className="mt-1 text-lg font-bold text-slate-900">
            Find your next opportunity
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Browse current tuition listings and discover learning options that
            match your interests.
          </p>
          <div className="mt-5 rounded-xl bg-indigo-50/80 p-4">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-white text-indigo-600 shadow-sm">
                <Compass aria-hidden="true" className="size-[18px]" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Explore the tuition board
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Find a good fit for your goals
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/tuitions"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 transition hover:text-indigo-700"
          >
            Browse tuitions
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </article>
      </section>
    </div>
  );
}
