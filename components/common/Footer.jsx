import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-light-gray">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-foreground/70 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Leaf size={16} className="text-forest-green" />
          <p>
            © {new Date().getFullYear()}{' '}
            <span className="font-heading font-semibold text-forest-green">KisanKart</span>. Fresh
            produce, direct from the source.
          </p>
        </div>
        <div className="flex gap-5">
          <Link href="/products" className="transition-colors hover:text-forest-green">
            Products
          </Link>
          <Link href="/cart" className="transition-colors hover:text-forest-green">
            Cart
          </Link>
        </div>
      </div>
    </footer>
  );
}
