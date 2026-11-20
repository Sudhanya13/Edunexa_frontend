import { BookOpenCheck } from "lucide-react";

export default function DashboardSection({ title, description }) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
      <section className="mt-7 flex min-h-56 items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm shadow-slate-200/30">
        <div>
          <span className="mx-auto grid size-12 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
            <BookOpenCheck aria-hidden="true" className="size-6" />
          </span>
          <p className="mt-3 text-base font-semibold text-slate-800">{title}</p>
          <p className="mt-1 text-sm text-slate-500">There is no information to display yet.</p>
        </div>
      </section>
    </div>
  );
}
