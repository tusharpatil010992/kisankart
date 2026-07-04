import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-gradient-green-soft shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-forest-green/30 hover:shadow-lg"
    >
      <div className="aspect-square w-full overflow-hidden bg-light-gray">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image_url || '/placeholder.svg'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-medium text-forest-green">{product.categories?.name}</span>
        <h3 className="font-medium font-heading text-foreground group-hover:text-forest-green">
          {product.name}
        </h3>
        <p className="mt-auto text-lg font-semibold text-forest-green">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
