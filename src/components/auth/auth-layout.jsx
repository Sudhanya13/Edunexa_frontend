import Link from "next/link";
import { BookOpen, GraduationCap, Sparkles, Trophy } from "lucide-react";

export function GoogleIcon({ className = "size-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.15 21.32 7.23 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.18C.43 8.13 0 9.82 0 12s.43 3.87 1.18 5.39l4.09-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.15 2.68 1.18 6.61l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
      />
    </svg>
  );
}

const courses = [
  { name: "UI Design Fundamentals", progress: 82, bar: "bg-amber-400" },
  { name: "Data Structures in Python", progress: 54, bar: "bg-emerald-400" },
  { name: "Business Communication", progress: 31, bar: "bg-sky-400" },
];

function BrandPanel() {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-800 to-violet-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-violet-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 size-[28rem] rounded-full bg-amber-400/20 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <Link
        href="/"
        className="relative z-10 flex items-center gap-2.5 self-start"
      >
        <div className="flex size-9 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
          <GraduationCap className="size-5" />
        </div>
        <span className="text-xl font-bold tracking-tight">EduNexa</span>
      </Link>

      <div className="relative z-10 max-w-md space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold leading-tight tracking-tight">
            Learn at your pace. Finish what you start.
          </h2>
          <p className="text-base leading-relaxed text-indigo-100/80">
            Courses, progress tracking, and certificates in one place, so every
            study session picks up right where the last one ended.
          </p>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl shadow-indigo-950/40 backdrop-blur-md">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <BookOpen className="size-4 text-amber-300" />
              Continue learning
            </div>
            <span className="flex items-center gap-1 rounded-full bg-amber-400/20 px-2.5 py-1 text-xs font-medium text-amber-200">
              <Trophy className="size-3" />
              7-day streak
            </span>
          </div>
          <div className="space-y-4">
            {courses.map((c) => (
              <div key={c.name} className="space-y-1.5">
                <div className="flex justify-between text-xs text-indigo-100/90">
                  <span>{c.name}</span>
                  <span className="font-medium">{c.progress}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                  <div
                    className={`h-full rounded-full ${c.bar}`}
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="relative z-10 flex items-center gap-2 text-sm text-indigo-100/70">
        <Sparkles className="size-4 text-amber-300" />
        Trusted by learners building new skills every day
      </p>
    </div>
  );
}

export function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-svh bg-white lg:grid-cols-2">
      <BrandPanel />

      <div className="relative flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50/70 to-white p-6 sm:p-10">
        <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/30">
            <GraduationCap className="size-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            EduNexa
          </span>
        </Link>

        <div className="w-full max-w-sm space-y-7">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {title}
            </h1>
            <p className="text-sm text-slate-500">{subtitle}</p>
          </div>
          {children}
          <p className="text-center text-sm text-slate-500">{footer}</p>
        </div>
      </div>
    </div>
  );
}

export const inputClass =
  "h-11 rounded-lg border-slate-200 bg-white shadow-sm placeholder:text-slate-400 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/30";

export const primaryBtnClass =
  "h-11 w-full rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 font-semibold text-white shadow-md shadow-indigo-500/25 transition hover:from-indigo-700 hover:to-violet-700 hover:shadow-lg hover:shadow-indigo-500/30";

export const googleBtnClass =
  "h-11 w-full gap-3 rounded-lg border-slate-200 bg-white font-medium text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50";

export function OrDivider() {
  return (
    <div className="relative flex items-center justify-center">
      <span className="absolute inset-x-0 top-1/2 border-t border-slate-200" />
      <span className="relative bg-gradient-to-b from-indigo-50/40 to-white px-3 text-xs text-slate-400">
        or use your email
      </span>
    </div>
  );
}
