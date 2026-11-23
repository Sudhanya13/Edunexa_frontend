export function DashboardSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading dashboard"
      className="w-full space-y-6 p-6 animate-pulse"
    >
      {/* Top Header / Breadcrumb Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-48 rounded-md bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-72 rounded-md bg-slate-200/80 dark:bg-slate-800/80" />
        </div>
        <div className="h-9 w-28 rounded-md bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* KPI / Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-200/70 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/50 space-y-3"
          >
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-8 w-32 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-20 rounded bg-slate-200/80 dark:bg-slate-800/80" />
          </div>
        ))}
      </div>

      {/* Main Content & Table/Chart Area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-slate-200/70 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/50 space-y-4">
          <div className="h-5 w-40 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-64 w-full rounded-lg bg-slate-200/70 dark:bg-slate-800/70" />
        </div>

        <div className="rounded-xl border border-slate-200/70 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/50 space-y-3">
          <div className="h-5 w-32 rounded bg-slate-200 dark:bg-slate-800" />
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-3 pt-1">
              <div className="h-9 w-9 shrink-0 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-1/2 rounded bg-slate-200/80 dark:bg-slate-800/80" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">Loading content, please wait...</span>
    </div>
  );
}
