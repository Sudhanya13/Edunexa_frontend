import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  GraduationCap,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { pricingPlans } from "@/lib/pricing";

const tuitions = [
  { subject: "Mathematics", title: "CBSE Mathematics", location: "Andheri, Mumbai", schedule: "Sat & Tue, 5 PM", level: "Class 10", price: "₹8,500", tutor: "Ms. Nafisa", initials: "MN", color: "bg-violet-100 text-violet-700" },
  { subject: "Science", title: "Class 9 Science", location: "Bandra, Mumbai", schedule: "Sun & Thu, 4 PM", level: "Class 9", price: "₹6,000", tutor: "Mr. Rahim", initials: "AR", color: "bg-emerald-100 text-emerald-700" },
  { subject: "English", title: "IELTS Preparation", location: "Online", schedule: "Fri, 7 PM", level: "All Levels", price: "₹12,000", tutor: "Sarah Khan", initials: "SK", color: "bg-amber-100 text-amber-700" },
];

export default function Home() {
  return (
    <main>
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
              Find the perfect tutor.<br /><span className="text-indigo-600">Learn with confidence.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Connect with trusted tutors and verified tuition opportunities, all in one simple place.</p>

            <div className="mt-8 flex max-w-xl items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/60">
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <Search className="size-5 shrink-0 text-slate-400" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Subject or course</p>
                  <p className="truncate text-sm font-semibold text-slate-800">What do you want to learn?</p>
                </div>
              </div>
              <Link href="/tuitions" className="flex h-12 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700">
                Search <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
              <span className="flex items-center gap-2"><BadgeCheck className="size-4 text-indigo-600" />Verified tutors</span>
              <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-indigo-600" />Secure learning</span>
              <span className="flex items-center gap-2"><Users className="size-4 text-indigo-600" />10k+ learners</span>
            </div>
          </div>

          <div className="relative hidden h-[470px] lg:block">
            <div className="absolute left-8 top-7 h-[410px] w-[420px] rotate-2 rounded-[32px] bg-gradient-to-br from-indigo-600 to-violet-500 shadow-2xl shadow-indigo-200" />
            <div className="absolute left-16 top-16 h-[348px] w-[350px] rounded-[28px] border border-white/50 bg-white/95 p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Today&apos;s learning</span>
                <span className="grid size-9 place-items-center rounded-full bg-amber-100 text-amber-700"><GraduationCap className="size-5" /></span>
              </div>
              <div className="mt-7 rounded-2xl bg-slate-950 p-5 text-white">
                <p className="text-xs text-slate-400">Next session</p>
                <h2 className="mt-2 text-xl font-bold">Advanced Mathematics</h2>
                <p className="mt-3 flex items-center gap-2 text-xs text-slate-300"><CalendarDays className="size-4 text-violet-300" />Today, 5:30 PM</p>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {["Mon", "Tue", "Wed"].map((day, index) => (
                  <div key={day} className={`rounded-xl border p-3 text-center ${index === 1 ? "border-indigo-200 bg-indigo-50" : "border-slate-100"}`}>
                    <p className="text-[10px] font-bold text-slate-400">{day}</p>
                    <p className="mt-1 text-sm font-black text-slate-800">{16 + index}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs"><span className="font-bold text-slate-600">Weekly progress</span><span className="font-bold text-indigo-600">72%</span></div>
                <div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-2 w-[72%] rounded-full bg-indigo-600" /></div>
              </div>
            </div>
            <div className="float-card absolute -right-1 top-28 w-44 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl">
              <div className="flex items-center gap-2"><span className="grid size-9 place-items-center rounded-full bg-emerald-100 text-emerald-700"><BadgeCheck className="size-5" /></span><div><p className="text-xs font-bold text-slate-900">Tutor verified</p><p className="text-[10px] text-slate-400">Top rated</p></div></div>
            </div>
            <div className="float-card-delayed absolute bottom-2 left-0 flex w-52 items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl">
              <span className="grid size-11 place-items-center rounded-xl bg-violet-100 text-violet-700"><BookOpen className="size-5" /></span>
              <div><p className="text-lg font-black text-slate-900">4.9/5</p><p className="flex text-amber-400"><Star className="size-3 fill-current" /><Star className="size-3 fill-current" /><Star className="size-3 fill-current" /><Star className="size-3 fill-current" /><Star className="size-3 fill-current" /></p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Fresh opportunities</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Popular tuitions near you</h2></div>
            <Link href="/tuitions" className="flex items-center gap-2 text-sm font-bold text-indigo-600">Browse all <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {tuitions.map((tuition) => (
              <article key={tuition.title} className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50">
                <div className="flex items-start justify-between">
                  <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${tuition.color}`}>{tuition.subject}</span>
                  <span className="text-lg font-black text-slate-900">{tuition.price}<span className="text-xs font-medium text-slate-400">/mo</span></span>
                </div>
                <h3 className="mt-5 text-xl font-black text-slate-900">{tuition.title}</h3>
                <div className="mt-4 space-y-2 text-sm text-slate-500">
                  <p className="flex items-center gap-2"><MapPin className="size-4 text-slate-400" />{tuition.location}</p>
                  <p className="flex items-center gap-2"><CalendarDays className="size-4 text-slate-400" />{tuition.schedule}</p>
                </div>
                <div className="mt-5 flex items-center border-t border-slate-100 pt-4">
                  <span className={`grid size-9 place-items-center rounded-full text-xs font-bold ${tuition.color}`}>{tuition.initials}</span>
                  <div className="ml-2.5"><p className="text-xs font-bold text-slate-800">{tuition.tutor}</p><p className="text-[10px] text-slate-400">Verified tutor</p></div>
                  <span className="ml-auto rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-bold text-slate-500">{tuition.level}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Simple process</p><h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Start learning in three steps</h2></div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["1", "Discover", "Explore verified tutors and tuition listings that match your goals."],
              ["2", "Connect", "Choose a profile and start a clear conversation about your needs."],
              ["3", "Learn", "Build momentum with a focused plan and the right support."],
            ].map(([number, title, copy]) => (
              <div key={number} className="rounded-2xl border border-slate-200 bg-white p-7 text-center">
                <span className="soft-pulse mx-auto grid size-12 place-items-center rounded-full bg-indigo-600 text-sm font-black text-white">{number}</span>
                <h3 className="mt-5 text-xl font-black text-slate-900">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-500">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Plans for every goal</p><h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Simple, transparent pricing</h2></div>
          <div className="mx-auto mt-10 grid max-w-4xl items-stretch gap-5 md:grid-cols-2">
            <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 text-slate-900 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
              <div aria-hidden="true" className="absolute -right-14 -top-16 size-40 rounded-full bg-slate-100 transition group-hover:scale-110" />
              <div className="relative flex items-center justify-between gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-slate-100 text-indigo-600"><BookOpen className="size-5" /></span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600">{pricingPlans.starter.badge}</span>
              </div>
              <h3 className="relative mt-5 text-lg font-black">{pricingPlans.starter.name}</h3>
              <p className="relative mt-2 min-h-10 text-sm leading-6 text-slate-500">{pricingPlans.starter.description}</p>
              <div className="relative mt-5 rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-4xl font-black text-slate-950">{pricingPlans.starter.price}<span className="ml-1 text-sm font-medium text-slate-400">{pricingPlans.starter.billing}</span></p>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {pricingPlans.starter.features.map((feature) => <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600"><BadgeCheck className="mt-0.5 size-4 shrink-0 text-indigo-600" />{feature}</li>)}
              </ul>
              <Link href="/signup" className="mt-7 flex h-12 items-center justify-center rounded-xl border border-slate-300 text-sm font-bold text-slate-800 transition hover:border-indigo-300 hover:bg-indigo-50/50">Get Started Free</Link>
            </article>
            <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-indigo-300 bg-white p-7 text-slate-900 shadow-xl shadow-indigo-100 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-200/70">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600" />
              <div aria-hidden="true" className="absolute -right-16 -top-16 size-44 rounded-full bg-indigo-50 transition group-hover:scale-110" />
              <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white"><Sparkles className="size-3.5" />Recommended</span>
              <div className="relative mt-4 flex items-center justify-between gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-indigo-100 text-indigo-700"><Sparkles className="size-5" /></span>
                <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-[11px] font-bold text-indigo-700">PRO Badge</span>
              </div>
              <h3 className="relative mt-5 text-lg font-black">{pricingPlans.pro.name}</h3>
              <p className="relative mt-2 min-h-10 text-sm leading-6 text-slate-500">{pricingPlans.pro.description}</p>
              <div className="relative mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-indigo-50 px-4 py-3"><p className="text-3xl font-black text-indigo-700">{pricingPlans.pro.tutorPrice}</p><p className="mt-1 text-xs font-medium text-slate-500">per month · Tutors</p></div>
                <div className="rounded-2xl border border-indigo-100 px-4 py-3"><p className="text-3xl font-black text-slate-950">{pricingPlans.pro.studentPrice}</p><p className="mt-1 text-xs font-medium text-slate-500">per month · Students</p></div>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {pricingPlans.pro.features.map((feature) => <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600"><BadgeCheck className="mt-0.5 size-4 shrink-0 text-indigo-600" />{feature}</li>)}
              </ul>
              <Link href="/signup" className="mt-7 flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700">Upgrade to Pro <ArrowRight className="size-4" /></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 pb-20 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 rounded-3xl bg-slate-950 px-7 py-10 text-white md:flex-row md:items-center lg:px-12">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">Your next step</p><h2 className="mt-3 max-w-xl text-3xl font-black">Ready to make learning feel easier?</h2></div>
          <Link href="/signup" className="flex shrink-0 items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-400">Join Edunexa <ArrowRight className="size-4" /></Link>
        </div>
      </section>
    </main>
  );
}
