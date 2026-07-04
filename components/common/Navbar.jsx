'use client';

import Link from 'next/link';
import { ShoppingCart, Leaf } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export default function Navbar() {
  const { count } = useCart();

  return (
    <header className="bg-forest-green text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <Leaf size={22} />
          KisanKart
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="hover:text-light-green">
            Products
          </Link>
          <Link href="/cart" className="relative flex items-center gap-1 hover:text-light-green">
            <ShoppingCart size={20} />
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-light-green text-xs text-forest-green">
                {count}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
