import Link from "next/link";
import { ArrowLeft, MapPin, Search } from "lucide-react";

export default function TuitionsPage() {
  return (
    <main className="min-h-[65vh] bg-slate-50 px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-indigo-600"><ArrowLeft className="size-4" />Back to home</Link>
        <div className="mt-8 flex flex-col gap-5 rounded-3xl bg-white p-7 shadow-sm md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-4 py-3"><Search className="size-5 text-slate-400" /><span className="text-sm text-slate-500">Search by subject</span></div>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3"><MapPin className="size-5 text-slate-400" /><span className="text-sm text-slate-500">Choose location</span></div>
        </div>
        <h1 className="mt-12 text-4xl font-black text-slate-950">Browse Tuitions</h1>
        <p className="mt-3 text-slate-500">Discover learning opportunities matched to your goals.</p>
      </div>
    </main>
  );
}
