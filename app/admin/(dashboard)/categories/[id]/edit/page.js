import { getCategoryById, updateCategory } from '@/app/actions/categories';
import CategoryForm from '@/components/categories/CategoryForm';

export default async function EditCategoryPage({ params }) {
  const { id } = await params;
  const category = await getCategoryById(id);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-foreground">Edit Category</h1>
      <CategoryForm category={category} action={updateCategory.bind(null, id)} />
    </div>
  );
}
