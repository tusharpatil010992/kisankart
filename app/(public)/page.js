import Link from 'next/link';
import { getProducts } from '@/app/actions/products';
import ProductGrid from '@/components/products/ProductGrid';
import Button from '@/components/ui/Button';

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.slice(0, 4);

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col items-center gap-4 rounded-lg bg-gradient-to-br from-forest-green to-light-green px-6 py-16 text-center text-white">
        <h1 className="text-3xl font-bold sm:text-4xl">Fresh from the Farm to You</h1>
        <p className="max-w-xl text-white/90">
          Quality produce and farming supplies, sourced directly from local farmers.
        </p>
        <Button as={Link} href="/products" variant="secondary">
          Shop Products
        </Button>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-foreground">Featured Products</h2>
        <ProductGrid products={featured} />
      </section>
    </div>
  );
}
