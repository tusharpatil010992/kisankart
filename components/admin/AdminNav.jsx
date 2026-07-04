'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, LayoutDashboard, Package, Tags } from 'lucide-react';
import clsx from 'clsx';
import { logout } from '@/app/actions/auth';
import Button from '@/components/ui/Button';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: Tags },
];

export default function AdminNav({ onNavigate, onClose }) {
  const pathname = usePathname();

  return (
    <nav className="flex h-full w-64 flex-col justify-between bg-gradient-green-strong p-4 text-white">
      <div className="flex flex-col gap-1">
        <div className="mb-4 flex items-center justify-between px-1">
          <span className="font-heading text-lg font-bold tracking-tight">KisanKart Admin</span>
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-md p-1 hover:bg-white/15 md:hidden"
            >
              <X size={20} />
            </button>
          )}
        </div>
        {links.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={clsx(
                'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
              )}
            >
              <Icon size={17} />
              {link.label}
            </Link>
          );
        })}
      </div>
      <form action={logout}>
        <Button type="submit" variant="secondary" className="w-full">
          Log Out
        </Button>
      </form>
    </nav>
  );
}
