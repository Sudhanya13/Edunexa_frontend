import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TuitionsBrowser from "@/components/TuitionsBrowser";

export default async function TuitionsPage({ searchParams }) {
  const { subject } = await searchParams;
  const response = await fetch(
    "https://edunexa-server.vercel.app/all-tuitions",
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tuition listings");
  }

  const data = await response.json();

  return (
    <main className="min-h-[65vh] bg-slate-50 px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>

        <TuitionsBrowser
          tuitions={Array.isArray(data) ? data : []}
          initialSubjectQuery={
            Array.isArray(subject) ? (subject[0] ?? "") : (subject ?? "")
          }
        />
      </div>
    </main>
  );
}
