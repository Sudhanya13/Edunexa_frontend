import Link from "next/link";
import { ArrowLeft, BadgeCheck } from "lucide-react";

const plans = [
  ["Starter", "Free", ["Browse listings", "One learning profile"]],
  ["Pro Student", "₹499 / month", ["Unlimited requests", "Priority placement"]],
  ["Pro Tutor", "₹799 / month", ["Featured profile", "Lead tools"]],
];

export default function PricingPage() {
  return (
    <main className="min-h-[65vh] bg-slate-50 px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-indigo-600"><ArrowLeft className="size-4" />Back to home</Link>
        <h1 className="mt-8 text-4xl font-black text-slate-950">Plans that fit your goals</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {plans.map(([name, price, features]) => (
            <div key={name} className="rounded-3xl border border-slate-200 bg-white p-7">
              <h2 className="text-xl font-black">{name}</h2><p className="mt-4 text-3xl font-black text-indigo-600">{price}</p>
              <ul className="mt-6 space-y-3">{features.map((feature) => <li key={feature} className="flex items-center gap-2 text-sm text-slate-600"><BadgeCheck className="size-4 text-indigo-600" />{feature}</li>)}</ul>
              <Link href="/signup" className="mt-7 flex h-11 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">Get Started</Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
