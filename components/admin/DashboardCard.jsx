export default function DashboardCard({ label, value }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <p className="text-sm text-foreground/60">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-forest-green">{value}</p>
    </div>
  );
}
