import { notFound } from 'next/navigation';
import { getProductById } from '@/app/actions/products';
import { formatPrice } from '@/lib/utils';
import AddToCartForm from '@/components/products/AddToCartForm';

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  let product;
  try {
    product = await getProductById(id);
  } catch {
    notFound();
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-light-gray">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image_url || '/placeholder.svg'}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium text-forest-green">{product.categories?.name}</span>
        <h1 className="text-2xl font-semibold text-foreground">{product.name}</h1>
        <p className="text-2xl font-bold text-forest-green">{formatPrice(product.price)}</p>
        <p className="text-foreground/80">{product.description}</p>
        <AddToCartForm product={product} />
      </div>
    </div>
  );
}
