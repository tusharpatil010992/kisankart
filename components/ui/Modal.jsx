'use client';

import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        {title && <h2 className="mb-4 pr-8 text-lg font-semibold text-foreground">{title}</h2>}
        {children}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1 text-foreground/50 transition-colors hover:bg-slate-100 hover:text-foreground"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
