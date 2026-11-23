import PageSkeleton from "@/components/PageSkeleton";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading authentication page"
      className="grid min-h-[65vh] animate-pulse place-items-center bg-slate-50 px-5"
    >
      <div className="w-full max-w-sm space-y-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="h-8 w-2/3 rounded-lg bg-slate-200" />
        <div className="h-4 w-4/5 rounded bg-slate-200/80" />
        <div className="h-11 w-full rounded-lg bg-slate-200" />
        <div className="h-11 w-full rounded-lg bg-slate-200" />
        <div className="h-11 w-full rounded-lg bg-slate-200" />
      </div>
      <span className="sr-only">Loading authentication page...</span>
    </div>
  );
}
