//
"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Crown,
  GraduationCap,
  ShieldAlert,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { pricingPlansByRole } from "@/lib/pricing";
import { useSession } from "@/lib/auth-client";

export default function PricingPlans() {
  const { data: session } = useSession();
  const [audience, setAudience] = useState("tutor");
  const plans = pricingPlansByRole[audience];

  const isAdmin = session?.user?.role?.toLowerCase() === "admin";

  const handleAdminBlock = (e) => {
    e.preventDefault();
    toast.error("Admin accounts do not need a Pro subscription.");
  };

  return (
    <>
      {isAdmin && (
        <div
          role="status"
          className="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 shadow-sm"
        >
          <ShieldAlert
            aria-hidden="true"
            className="size-4 shrink-0 text-amber-600"
          />
          <span>
            You are signed in as an <strong>Admin</strong>. Pro plans are for
            Tutors and Students only—checkout is disabled for admin accounts.
          </span>
        </div>
      )}

      <div
        aria-label="Choose who the plans are for"
        className="mx-auto mt-8 inline-flex rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm"
        role="group"
      >
        {[
          { id: "tutor", label: "For Tutors", Icon: GraduationCap },
          { id: "student", label: "For Students", Icon: UsersRound },
        ].map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            aria-pressed={audience === id}
            onClick={() => setAudience(id)}
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition ${
              audience === id
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
            }`}
          >
            <Icon aria-hidden="true" className="size-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-8 grid max-w-4xl items-stretch gap-6 md:grid-cols-2">
        <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70 sm:p-8">
          <div
            aria-hidden="true"
            className="absolute -right-14 -top-16 size-40 rounded-full bg-slate-100 transition group-hover:scale-110"
          />
          <div className="relative flex items-center justify-between gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-slate-100 text-indigo-600">
              <BadgeCheck aria-hidden="true" className="size-6" />
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600">
              {plans.starter.badge}
            </span>
          </div>
          <h2 className="relative mt-5 text-xl font-bold tracking-tight text-slate-950">
            {plans.starter.name}
          </h2>
          <p className="relative mt-2 min-h-12 text-sm leading-6 text-slate-600">
            {plans.starter.description}
          </p>
          <div className="relative mt-5 rounded-2xl bg-slate-50 px-5 py-4">
            <p className="text-4xl font-black tracking-tight text-slate-950">
              {plans.starter.price}
              <span className="ml-1 text-sm font-medium text-slate-500">
                {plans.starter.billing}
              </span>
            </p>
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            What&apos;s included
          </p>
          <ul className="mt-4 flex-1 space-y-3.5">
            {plans.starter.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-sm text-slate-600"
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-indigo-500"
                />
                {feature}
              </li>
            ))}
          </ul>
          {isAdmin ? (
            <button
              type="button"
              onClick={handleAdminBlock}
              aria-disabled="true"
              className="mt-7 flex h-12 w-full cursor-not-allowed items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-sm font-bold text-slate-400"
            >
              Not Available for Admin
            </button>
          ) : (
            <Link
              href="/signup"
              className="mt-7 flex h-12 items-center justify-center rounded-xl border border-slate-300 bg-white text-sm font-bold text-slate-800 transition hover:border-indigo-300 hover:bg-indigo-50/50"
            >
              Get Started Free
            </Link>
          )}
        </article>

        <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-indigo-300 bg-white p-7 shadow-xl shadow-indigo-200/50 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-200/70 sm:p-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600"
          />
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 size-48 rounded-full bg-indigo-50 transition group-hover:scale-110"
          />
          <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-sm shadow-indigo-200">
            <Sparkles aria-hidden="true" className="size-3.5" />
            Recommended
          </span>
          <div className="relative mt-4 flex items-center justify-between gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-indigo-100 text-indigo-700">
              <Crown aria-hidden="true" className="size-6" />
            </span>
            <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-[11px] font-bold text-indigo-700">
              {plans.pro.badge}
            </span>
          </div>
          <h2 className="relative mt-5 text-xl font-bold tracking-tight text-slate-950">
            {plans.pro.name}
          </h2>
          <p className="relative mt-2 min-h-12 text-sm leading-6 text-slate-600">
            {plans.pro.description}
          </p>
          <div className="relative mt-5 rounded-2xl bg-indigo-50 px-5 py-4">
            <p className="text-4xl font-black tracking-tight text-indigo-700">
              {plans.pro.price}
              <span className="ml-1 text-sm font-medium text-slate-600">
                {plans.pro.billing}
              </span>
            </p>
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            Everything in Free, plus
          </p>
          <ul className="mt-4 flex-1 space-y-3.5">
            {plans.pro.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-sm text-slate-600"
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-indigo-600"
                />
                {feature}
              </li>
            ))}
          </ul>
          {isAdmin ? (
            <button
              type="button"
              onClick={handleAdminBlock}
              aria-disabled="true"
              className="mt-7 flex h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-200 text-sm font-bold text-slate-500"
            >
              Admin Account — No Plan Needed
            </button>
          ) : (
            <Link
              href={`/payments/checkout?role=${audience}`}
              className="mt-7 flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
            >
              Upgrade to Pro
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          )}
        </article>
      </div>
    </>
  );
}
