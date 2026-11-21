"use client";

import { useMemo, useState } from "react";
import { MapPin, Search, X } from "lucide-react";
import Tuitioncard from "@/components/Tuitioncard";

export default function TuitionsBrowser({ tuitions = [] }) {
  const [subjectQuery, setSubjectQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const locations = useMemo(() => {
    const unique = new Set();
    tuitions.forEach((item) => {
      if (typeof item?.location === "string" && item.location.trim()) {
        unique.add(item.location.trim());
      }
    });
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [tuitions]);

  const filteredTuitions = useMemo(() => {
    const q = subjectQuery.trim().toLowerCase();

    return tuitions.filter((item) => {
      const matchesSubject =
        !q ||
        String(item?.subject ?? "")
          .toLowerCase()
          .includes(q) ||
        String(item?.title ?? "")
          .toLowerCase()
          .includes(q) ||
        String(item?.classLevel ?? "")
          .toLowerCase()
          .includes(q);

      const itemLocation = String(item?.location ?? "").trim();
      const matchesLocation =
        !selectedLocation ||
        itemLocation.toLowerCase() === selectedLocation.toLowerCase();

      return matchesSubject && matchesLocation;
    });
  }, [tuitions, subjectQuery, selectedLocation]);

  const hasActiveFilters = Boolean(subjectQuery.trim() || selectedLocation);

  const handleReset = () => {
    setSubjectQuery("");
    setSelectedLocation("");
  };

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm md:flex-row md:items-center md:p-7">
        <div className="relative flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
          <Search className="size-5 shrink-0 text-slate-400" />
          <input
            type="text"
            value={subjectQuery}
            onChange={(e) => setSubjectQuery(e.target.value)}
            placeholder="Search by subject (e.g., Math, Physics, Chemistry)..."
            aria-label="Search by subject"
            className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          {subjectQuery && (
            <button
              type="button"
              onClick={() => setSubjectQuery("")}
              aria-label="Clear subject search"
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 md:w-64">
          <MapPin className="size-5 shrink-0 text-slate-400" />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            aria-label="Choose location"
            className="w-full bg-transparent text-sm text-slate-700 focus:outline-none"
          >
            <option value="">All locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            Reset
          </button>
        )}
      </div>

      <div className="mt-12 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-950">
            Browse Tuitions
          </h1>
          <p className="mt-3 text-slate-500">
            Discover learning opportunities matched to your goals.
          </p>
        </div>

        <p className="text-sm font-medium text-slate-500">
          Showing{" "}
          <span className="font-bold text-slate-800">
            {filteredTuitions.length}
          </span>{" "}
          of <span className="font-bold text-slate-800">{tuitions.length}</span>{" "}
          tuitions
        </p>
      </div>

      <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredTuitions.length > 0 ? (
          filteredTuitions.map((tuition) => (
            <Tuitioncard key={tuition._id} tuition={tuition} />
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
            <p className="text-base font-semibold text-slate-700">
              No matching tuitions found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try adjusting your subject keyword or location filter.
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
