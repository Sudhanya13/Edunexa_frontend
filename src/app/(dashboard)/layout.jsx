import DashboardSidebar from "@/components/dashboard/shared/DashboardSidebar";
import { Bell, ChevronDown, Search } from "lucide-react";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f7f8fc] lg:flex">
      <DashboardSidebar />

      <div className="min-w-0 flex-1">
        <header className="border-b border-slate-200/80 bg-white">
          <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
                Student workspace
              </p>
              <h1 className="mt-1 truncate text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Your dashboard
              </h1>
            </div>

            <div className="flex shrink-0 items-center gap-3 sm:gap-5">
              <div className="hidden items-center gap-2 rounded-full bg-slate-50 px-4 py-2.5 text-sm text-slate-500 md:flex">
                <Search aria-hidden="true" className="size-4" />
                <span>Make progress, one lesson at a time</span>
              </div>
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-full border border-slate-200 text-slate-600"
              >
                <Bell className="size-[18px]" />
              </span>
              <div className="flex items-center gap-2.5 border-l border-slate-200 pl-3 sm:pl-5">
                <span className="grid size-10 place-items-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                  S
                </span>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-slate-900">
                    Student account
                  </p>
                  <p className="text-xs text-slate-500">Learner</p>
                </div>
                <ChevronDown
                  aria-hidden="true"
                  className="hidden size-4 text-slate-400 sm:block"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1440px] px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
