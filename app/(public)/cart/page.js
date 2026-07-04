'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import CheckoutForm from '@/components/cart/CheckoutForm';
import Button from '@/components/ui/Button';

export default function CartPage() {
  const { items, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-foreground/60">Your cart is empty.</p>
        <Button as={Link} href="/products">
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <h1 className="mb-4 text-2xl font-semibold text-foreground">Your Cart</h1>
        {items.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <CartSummary total={total} />
        <CheckoutForm />
      </div>
    </div>
  );
}
