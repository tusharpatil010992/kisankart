import { getProducts } from '@/app/actions/products';
import { getCategories } from '@/app/actions/categories';
import ProductGrid from '@/components/products/ProductGrid';
import SearchBar from '@/components/products/SearchBar';
import CategoryFilter from '@/components/categories/CategoryFilter';

export const metadata = { title: 'Products - KisanKart' };

export default async function ProductsPage({ searchParams }) {
  const { q, category } = await searchParams;

  const [products, categories] = await Promise.all([
    getProducts({ categoryId: category, query: q }),
    getCategories(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-foreground">Products</h1>
      <SearchBar defaultValue={q} categoryId={category} />
      <CategoryFilter categories={categories} activeCategoryId={category} query={q} />
      <ProductGrid products={products} />
    </div>
  );
}
