import Link from "next/link";
import { ArrowRight } from "lucide-react";
import React from "react";
import Tuitioncard from "../Tuitioncard";

export default async function LatestTuitions() {
  const response = await fetch("http://localhost:5000/all-tuitions/latest", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch tuitions");
  }

  const data = await response.json();

  //   const latestTuitions = data.slice(-6).reverse();

  return (
    <div>
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                Fresh opportunities
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Latest Approved tuitions near you
              </h2>
              <p>
                Discover top-rated home and online tuition opportunities
                verified by academic administrators.
              </p>
            </div>
            <Link
              href="/tuitions"
              className="flex items-center gap-2 text-sm font-bold text-indigo-600"
            >
              Browse all <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {data.map((tuition) => (
              <Tuitioncard key={tuition._id} tuition={tuition} />
            ))}
          </div>
          {/* <div className="mt-9 grid gap-5 md:grid-cols-3">
            {tuitions.map((tuition) => (
              <article
                key={tuition.title}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${tuition.color}`}
                  >
                    {tuition.subject}
                  </span>
                  <span className="text-lg font-black text-slate-900">
                    {tuition.price}
                    <span className="text-xs font-medium text-slate-400">
                      /mo
                    </span>
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-black text-slate-900">
                  {tuition.title}
                </h3>
                <div className="mt-4 space-y-2 text-sm text-slate-500">
                  <p className="flex items-center gap-2">
                    <MapPin className="size-4 text-slate-400" />
                    {tuition.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <CalendarDays className="size-4 text-slate-400" />
                    {tuition.schedule}
                  </p>
                </div>
                <div className="mt-5 flex items-center border-t border-slate-100 pt-4">
                  <span
                    className={`grid size-9 place-items-center rounded-full text-xs font-bold ${tuition.color}`}
                  >
                    {tuition.initials}
                  </span>
                  <div className="ml-2.5">
                    <p className="text-xs font-bold text-slate-800">
                      {tuition.tutor}
                    </p>
                    <p className="text-[10px] text-slate-400">Verified tutor</p>
                  </div>
                  <span className="ml-auto rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-bold text-slate-500">
                    {tuition.level}
                  </span>
                </div>
              </article>
            ))}
          </div> */}
        </div>
      </section>
    </div>
  );
}
