import { Sparkles } from "lucide-react";
import PricingPlans from "@/components/pricing/PricingPlans";

export default function PricingPage() {
  return (
    <main className="relative min-h-[65vh] overflow-hidden bg-slate-50 px-5 py-12 sm:py-16 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-indigo-100/70 to-transparent"
      />
      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-indigo-700 shadow-sm">
            <Sparkles className="size-3.5" />
            Plans for every goal
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Choose the right plan for you
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
            Simple, transparent plans designed for ambitious tutors and
            committed students.
          </p>
        </div>
        <PricingPlans />
      </div>
    </main>
  );
}
