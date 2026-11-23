import Link from "next/link";
import {
  ArrowRight,
  Atom,
  BadgeCheck,
  BookOpen,
  Calculator,
  Code2,
  Languages,
  Sparkles,
} from "lucide-react";
import { pricingPlans } from "@/lib/pricing";
import Banner from "@/components/home/Banner";
import LatestTuitions from "@/components/home/LatestTuitions";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Banner />
      <Suspense
        fallback={
          <p className="mt-9 text-center text-slate-500">
            Loading latest tuition listings...
          </p>
        }
      >
        <LatestTuitions />
      </Suspense>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              Simple process
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              Start learning in three steps
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              [
                "1",
                "Discover",
                "Explore verified tutors and tuition listings that match your goals.",
              ],
              [
                "2",
                "Connect",
                "Choose a profile and start a clear conversation about your needs.",
              ],
              [
                "3",
                "Learn",
                "Build momentum with a focused plan and the right support.",
              ],
            ].map(([number, title, copy]) => (
              <div
                key={number}
                className="rounded-2xl border border-slate-200 bg-white p-7 text-center"
              >
                <span className="soft-pulse mx-auto grid size-12 place-items-center rounded-full bg-indigo-600 text-sm font-black text-white">
                  {number}
                </span>
                <h3 className="mt-5 text-xl font-black text-slate-900">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-indigo-50/60 py-20">
        <div
          aria-hidden="true"
          className="absolute -left-24 top-10 size-72 rounded-full bg-violet-100/70 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                Find your focus
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Explore popular subjects
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Start with a subject you love. Browse opportunities and find
                the right tutor for your next learning goal.
              </p>
            </div>
            <Link
              href="/tuitions"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-indigo-600 transition hover:text-indigo-700"
            >
              Browse all subjects <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Math",
                query: "Math",
                description: "Build confidence with numbers and problem-solving.",
                icon: Calculator,
                style: "bg-blue-50 text-blue-700 ring-blue-100",
              },
              {
                name: "Physics",
                query: "Physics",
                description: "Make the ideas behind our world easier to grasp.",
                icon: Atom,
                style: "bg-violet-50 text-violet-700 ring-violet-100",
              },
              {
                name: "Programming",
                query: "Programming",
                description: "Learn coding skills and create something new.",
                icon: Code2,
                style: "bg-emerald-50 text-emerald-700 ring-emerald-100",
              },
              {
                name: "IELTS",
                query: "IELTS",
                description: "Prepare for your English-language goals.",
                icon: Languages,
                style: "bg-amber-50 text-amber-700 ring-amber-100",
              },
            ].map(({ name, query, description, icon: SubjectIcon, style }) => (
              <Link
                key={name}
                href={`/tuitions?subject=${encodeURIComponent(query)}`}
                className="group rounded-2xl border border-white bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/70"
              >
                <span
                  className={`grid size-12 place-items-center rounded-xl ring-1 ${style}`}
                >
                  <SubjectIcon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-black text-slate-900 transition group-hover:text-indigo-700">
                  {name}
                </h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
                  {description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                  Explore {name} <ArrowRight className="size-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              Plans for every goal
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              Simple, transparent pricing
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl items-stretch gap-5 md:grid-cols-2">
            <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 text-slate-900 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
              <div
                aria-hidden="true"
                className="absolute -right-14 -top-16 size-40 rounded-full bg-slate-100 transition group-hover:scale-110"
              />
              <div className="relative flex items-center justify-between gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-slate-100 text-indigo-600">
                  <BookOpen className="size-5" />
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600">
                  {pricingPlans.starter.badge}
                </span>
              </div>
              <h3 className="relative mt-5 text-lg font-black">
                {pricingPlans.starter.name}
              </h3>
              <p className="relative mt-2 min-h-10 text-sm leading-6 text-slate-500">
                {pricingPlans.starter.description}
              </p>
              <div className="relative mt-5 rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-4xl font-black text-slate-950">
                  {pricingPlans.starter.price}
                  <span className="ml-1 text-sm font-medium text-slate-400">
                    {pricingPlans.starter.billing}
                  </span>
                </p>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {pricingPlans.starter.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-slate-600"
                  >
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-indigo-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="mt-7 flex h-12 items-center justify-center rounded-xl border border-slate-300 text-sm font-bold text-slate-800 transition hover:border-indigo-300 hover:bg-indigo-50/50"
              >
                Get Started Free
              </Link>
            </article>
            <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-indigo-300 bg-white p-7 text-slate-900 shadow-xl shadow-indigo-100 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-200/70">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600"
              />
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 size-44 rounded-full bg-indigo-50 transition group-hover:scale-110"
              />
              <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                <Sparkles className="size-3.5" />
                Recommended
              </span>
              <div className="relative mt-4 flex items-center justify-between gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-indigo-100 text-indigo-700">
                  <Sparkles className="size-5" />
                </span>
                <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-[11px] font-bold text-indigo-700">
                  PRO Badge
                </span>
              </div>
              <h3 className="relative mt-5 text-lg font-black">
                {pricingPlans.pro.name}
              </h3>
              <p className="relative mt-2 min-h-10 text-sm leading-6 text-slate-500">
                {pricingPlans.pro.description}
              </p>
              <div className="relative mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-indigo-50 px-4 py-3">
                  <p className="text-3xl font-black text-indigo-700">
                    {pricingPlans.pro.tutorPrice}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    per month · Tutors
                  </p>
                </div>
                <div className="rounded-2xl border border-indigo-100 px-4 py-3">
                  <p className="text-3xl font-black text-slate-950">
                    {pricingPlans.pro.studentPrice}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    per month · Students
                  </p>
                </div>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {pricingPlans.pro.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-slate-600"
                  >
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-indigo-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="mt-7 flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
              >
                Upgrade to Pro <ArrowRight className="size-4" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 pb-20 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 rounded-3xl bg-slate-950 px-7 py-10 text-white md:flex-row md:items-center lg:px-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
              Your next step
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-black">
              Ready to make learning feel easier?
            </h2>
          </div>
          <Link
            href="/signup"
            className="flex shrink-0 items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-400"
          >
            Join Edunexa <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
