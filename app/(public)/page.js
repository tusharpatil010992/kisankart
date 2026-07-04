import Link from 'next/link';
import { getProducts } from '@/app/actions/products';
import ProductGrid from '@/components/products/ProductGrid';
import Button from '@/components/ui/Button';

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.slice(0, 4);

  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      <section className="flex flex-col items-center gap-5 rounded-3xl bg-gradient-green-strong px-6 py-14 text-center text-white shadow-lg sm:py-20 lg:py-24">
        <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Fresh from the Farm to You
        </h1>
        <p className="max-w-xl text-base text-white/90 sm:text-lg">
          Quality produce and farming supplies, sourced directly from local farmers.
        </p>
        <Button as={Link} href="/products" variant="secondary" className="mt-1">
          Shop Products
        </Button>
      </section>

      <section className="flex flex-col gap-4 sm:gap-6">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Featured Products</h2>
        <ProductGrid products={featured} />
      </section>
    </div>
  );
}
