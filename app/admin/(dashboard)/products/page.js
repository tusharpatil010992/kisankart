import Link from 'next/link';
import { getProducts, deleteProduct } from '@/app/actions/products';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import ConfirmDelete from '@/components/admin/ConfirmDelete';

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Products</h1>
        <Button as={Link} href="/admin/products/create">
          Add Product
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-sage-green text-foreground/60">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-sage-green/50 last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">{product.name}</td>
                <td className="px-4 py-3 text-foreground/70">{product.categories?.name}</td>
                <td className="px-4 py-3 text-foreground/70">{formatPrice(product.price)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
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
