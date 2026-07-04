'use client';

import Link from 'next/link';
import { ShoppingCart, Leaf } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export default function Navbar() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-gradient-green-strong text-white shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
            <Leaf size={18} />
          </span>
          KisanKart
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium sm:gap-6">
          <Link
            href="/products"
            className="rounded-md px-2 py-1 transition-colors hover:bg-white/10"
          >
            Products
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-white/10"
          >
            <ShoppingCart size={19} />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-forest-green shadow-sm">
                {count}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
