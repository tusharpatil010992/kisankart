import Link from 'next/link';
import { logout } from '@/app/actions/auth';
import Button from '@/components/ui/Button';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/categories', label: 'Categories' },
];

export default function AdminNav() {
  return (
    <nav className="flex h-full flex-col justify-between bg-forest-green p-4 text-white">
      <div className="flex flex-col gap-2">
        <span className="mb-4 text-lg font-semibold">KisanKart Admin</span>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-light-green"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <form action={logout}>
        <Button type="submit" variant="secondary" className="w-full">
          Log Out
        </Button>
      </form>
    </nav>
  );
}
