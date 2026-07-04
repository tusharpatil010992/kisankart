import { createCategory } from '@/app/actions/categories';
import CategoryForm from '@/components/categories/CategoryForm';

export default function CreateCategoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-foreground">Add Category</h1>
      <CategoryForm action={createCategory} />
    </div>
  );
}
