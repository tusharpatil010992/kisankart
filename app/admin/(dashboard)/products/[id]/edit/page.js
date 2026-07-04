import { getProductById, updateProduct } from '@/app/actions/products';
import { getCategories } from '@/app/actions/categories';
import ProductForm from '@/components/products/ProductForm';

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getProductById(id), getCategories()]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-foreground">Edit Product</h1>
      <ProductForm
        product={product}
        categories={categories}
        action={updateProduct.bind(null, id)}
      />
    </div>
  );
}
