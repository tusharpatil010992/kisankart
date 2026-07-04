import { getProducts } from '@/app/actions/products';
import { getCategories } from '@/app/actions/categories';
import DashboardCard from '@/components/admin/DashboardCard';

export default async function AdminDashboardPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <DashboardCard label="Products" value={products.length} />
        <DashboardCard label="Categories" value={categories.length} />
      </div>
    </div>
  );
}
