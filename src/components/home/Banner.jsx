import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Banner() {
  return (
    <div>
      <section className="hero-grid relative overflow-hidden border-b border-slate-100">
        <div className="absolute -left-24 top-20 size-72 rounded-full bg-violet-100/70 blur-3xl" />
        <div className="absolute -right-28 bottom-0 size-80 rounded-full bg-indigo-100/70 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-2 text-xs font-bold text-indigo-700">
              <Sparkles className="size-3.5" />
              The smarter way to learn
            </div>
            <h1 className="mt-6 max-w-2xl text-5xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-6xl">
              Find the perfect tutor.
              <br />
              <span className="text-indigo-600">Learn with confidence.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Connect with trusted tutors and verified tuition opportunities,
              all in one simple place.
            </p>

            <div className="mt-8 flex max-w-xl items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/60">
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <Search className="size-5 shrink-0 text-slate-400" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Subject or course
                  </p>
                  <p className="truncate text-sm font-semibold text-slate-800">
                    What do you want to learn?
                  </p>
                </div>
              </div>
              <Link
                href="/tuitions"
                className="flex h-12 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
              >
                Search <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <BadgeCheck className="size-4 text-indigo-600" />
                Verified tutors
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-indigo-600" />
                Secure learning
              </span>
              <span className="flex items-center gap-2">
                <Users className="size-4 text-indigo-600" />
                10k+ learners
              </span>
            </div>
          </div>

          <div className="relative hidden h-[470px] lg:block">
            <div className="absolute left-8 top-7 h-[410px] w-[420px] rotate-2 rounded-[32px] bg-gradient-to-br from-indigo-600 to-violet-500 shadow-2xl shadow-indigo-200" />
            <div className="absolute left-16 top-16 h-[348px] w-[350px] rounded-[28px] border border-white/50 bg-white/95 p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Today&apos;s learning
                </span>
                <span className="grid size-9 place-items-center rounded-full bg-amber-100 text-amber-700">
                  <GraduationCap className="size-5" />
                </span>
              </div>
              <div className="mt-7 rounded-2xl bg-slate-950 p-5 text-white">
                <p className="text-xs text-slate-400">Next session</p>
                <h2 className="mt-2 text-xl font-bold">Advanced Mathematics</h2>
                <p className="mt-3 flex items-center gap-2 text-xs text-slate-300">
                  <CalendarDays className="size-4 text-violet-300" />
                  Today, 5:30 PM
                </p>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {["Mon", "Tue", "Wed"].map((day, index) => (
                  <div
                    key={day}
                    className={`rounded-xl border p-3 text-center ${index === 1 ? "border-indigo-200 bg-indigo-50" : "border-slate-100"}`}
                  >
                    <p className="text-[10px] font-bold text-slate-400">
                      {day}
                    </p>
                    <p className="mt-1 text-sm font-black text-slate-800">
                      {16 + index}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-600">
                    Weekly progress
                  </span>
                  <span className="font-bold text-indigo-600">72%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-[72%] rounded-full bg-indigo-600" />
                </div>
              </div>
            </div>
            <div className="float-card absolute -right-1 top-28 w-44 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl">
              <div className="flex items-center gap-2">
                <span className="grid size-9 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                  <BadgeCheck className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Tutor verified
                  </p>
                  <p className="text-[10px] text-slate-400">Top rated</p>
                </div>
              </div>
            </div>
            <div className="float-card-delayed absolute bottom-2 left-0 flex w-52 items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl">
              <span className="grid size-11 place-items-center rounded-xl bg-violet-100 text-violet-700">
                <BookOpen className="size-5" />
              </span>
              <div>
                <p className="text-lg font-black text-slate-900">4.9/5</p>
                <p className="flex text-amber-400">
                  <Star className="size-3 fill-current" />
                  <Star className="size-3 fill-current" />
                  <Star className="size-3 fill-current" />
                  <Star className="size-3 fill-current" />
                  <Star className="size-3 fill-current" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
