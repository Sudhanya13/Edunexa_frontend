import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <main className="min-h-[65vh] bg-slate-50 px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-indigo-600"><ArrowLeft className="size-4" />Back to home</Link>
        <h1 className="mt-8 text-4xl font-black text-slate-950">How Edunexa works</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[["01", "Discover", "Find a tutor or tuition that fits your needs."], ["02", "Connect", "Review profiles and start a conversation."], ["03", "Learn", "Follow a clear plan and track progress."]].map(([number, title, copy]) => (
            <div key={number} className="rounded-2xl border border-slate-200 bg-white p-6"><span className="text-sm font-black text-indigo-600">{number}</span><h2 className="mt-4 text-xl font-black">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-500">{copy}</p></div>
          ))}
        </div>
      </div>
    </main>
  );
}
