import Link from 'next/link';
import { getCategories, deleteCategory } from '@/app/actions/categories';
import Button from '@/components/ui/Button';
import ConfirmDelete from '@/components/admin/ConfirmDelete';

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Categories</h1>
        <Button as={Link} href="/admin/categories/create">
          Add Category
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-sage-green text-foreground/60">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b border-sage-green/50 last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">{category.name}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
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
