import Link from 'next/link';
import { getCategories, deleteCategory } from '@/app/actions/categories';
import Button from '@/components/ui/Button';
import ConfirmDelete from '@/components/admin/ConfirmDelete';

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Categories</h1>
        <Button as={Link} href="/admin/categories/create">
          Add Category
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="hidden bg-slate-50 text-xs font-semibold uppercase tracking-wide text-foreground/50 md:table-header-group">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="flex flex-col gap-2 border-b border-slate-200 p-4 last:border-0 md:table-row md:gap-0 md:p-0"
              >
                <td className="md:px-4 md:py-3">
                  <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-foreground/40 md:hidden">
                    Name{' '}
                  </span>
                  <span className="font-medium text-foreground">{category.name}</span>
                </td>
                <td className="pt-1 md:px-4 md:py-3 md:pt-0">
                  <div className="flex gap-4">
                    <Link
                      href={`/admin/categories/${category.id}/edit`}
                      className="text-sm font-medium text-forest-green hover:underline"
                    >
                      Edit
                    </Link>
                    <ConfirmDelete
                      action={deleteCategory}
                      id={category.id}
                      itemName={category.name}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && (
          <p className="p-6 text-center text-foreground/60">No categories yet.</p>
        )}
      </div>
    </div>
  );
}
