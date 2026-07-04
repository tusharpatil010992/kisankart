'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import AdminNav from './AdminNav';

export default function AdminShell({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
        <span className="font-heading text-lg font-bold text-forest-green">KisanKart Admin</span>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="rounded-lg p-2 text-forest-green hover:bg-sage-green/40"
        >
          <Menu size={22} />
        </button>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-200 ease-out md:static md:z-auto md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <AdminNav onNavigate={() => setOpen(false)} onClose={() => setOpen(false)} />
      </div>

      <main className="flex-1 bg-light-gray p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
