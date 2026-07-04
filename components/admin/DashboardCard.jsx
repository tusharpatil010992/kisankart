export default function DashboardCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-green-soft p-6 shadow-sm transition-shadow hover:shadow-md">
      <p className="text-sm font-medium text-foreground/60">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-forest-green">{value}</p>
    </div>
  );
}
