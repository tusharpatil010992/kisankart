import { createProduct } from '@/app/actions/products';
import { getCategories } from '@/app/actions/categories';
import ProductForm from '@/components/products/ProductForm';

export default async function CreateProductPage() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-foreground">Add Product</h1>
      <ProductForm categories={categories} action={createProduct} />
    </div>
  );
}
