import Link from 'next/link';
import { getProducts, deleteProduct } from '@/app/actions/products';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import ConfirmDelete from '@/components/admin/ConfirmDelete';

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Products</h1>
        <Button as={Link} href="/admin/products/create">
          Add Product
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="hidden bg-slate-50 text-xs font-semibold uppercase tracking-wide text-foreground/50 md:table-header-group">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="flex flex-col gap-2 border-b border-slate-200 p-4 last:border-0 md:table-row md:gap-0 md:p-0"
              >
                <td className="md:px-4 md:py-3">
                  <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-foreground/40 md:hidden">
                    Name{' '}
                  </span>
                  <span className="font-medium text-foreground">{product.name}</span>
                </td>
                <td className="md:px-4 md:py-3">
                  <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-foreground/40 md:hidden">
                    Category{' '}
                  </span>
                  <span className="text-foreground/70">{product.categories?.name}</span>
                </td>
                <td className="md:px-4 md:py-3">
                  <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-foreground/40 md:hidden">
                    Price{' '}
                  </span>
                  <span className="text-foreground/70">{formatPrice(product.price)}</span>
                </td>
                <td className="pt-1 md:px-4 md:py-3 md:pt-0">
                  <div className="flex gap-4">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-sm font-medium text-forest-green hover:underline"
                    >
                      Edit
                    </Link>
                    <ConfirmDelete action={deleteProduct} id={product.id} itemName={product.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="p-6 text-center text-foreground/60">No products yet.</p>
        )}
      </div>
    </div>
  );
}
