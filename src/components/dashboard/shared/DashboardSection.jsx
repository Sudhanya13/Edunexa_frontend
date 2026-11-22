export default function DashboardSection({ title, description, children }) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
      {children}
    </div>
  );
}
