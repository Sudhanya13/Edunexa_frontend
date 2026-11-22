import Link from "next/link";
import { ArrowLeft, CreditCard, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Payment Canceled | Edunexa",
};

export default function CheckoutCancelPage() {
  return (
    <main className="relative min-h-[72vh] overflow-hidden bg-slate-50 px-5 py-12 sm:py-16 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-amber-100/70 to-transparent"
      />

      <section className="relative mx-auto max-w-xl rounded-[2rem] border border-slate-200 bg-white px-6 py-10 text-center shadow-xl shadow-slate-200/70 sm:px-10 sm:py-12">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-amber-50 ring-8 ring-amber-50/60">
          <span className="grid size-12 place-items-center rounded-full bg-amber-500 text-white">
            <CreditCard aria-hidden="true" className="size-6" />
          </span>
        </div>

        <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
          Payment canceled
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
          No payment was made
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-600">
          Your checkout was canceled, so you haven&apos;t been charged. You can
          review the plans and try again whenever you&apos;re ready.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/pricing"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50/60 hover:text-indigo-700"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to pricing
          </Link>
          <Link
            href="/payments/checkout"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
          >
            <RefreshCw aria-hidden="true" className="size-4" />
            Try again
          </Link>
        </div>
      </section>
    </main>
  );
}