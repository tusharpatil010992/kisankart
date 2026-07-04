import AdminNav from '@/components/admin/AdminNav';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 flex-shrink-0">
        <AdminNav />
      </aside>
      <main className="flex-1 bg-light-gray p-8">{children}</main>
    </div>
  );
}
