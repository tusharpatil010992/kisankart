'use client';

import { X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="flex-1">
        <p className="font-medium text-foreground">{item.name}</p>
        <p className="text-sm text-foreground/60">{formatPrice(item.price)} each</p>
      </div>
      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <div className="flex items-center rounded-xl border border-slate-200">
          <button
            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            className="px-3 py-1.5 text-forest-green transition-colors hover:bg-sage-green/40"
          >
            −
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            className="px-3 py-1.5 text-forest-green transition-colors hover:bg-sage-green/40"
          >
            +
          </button>
        </div>
        <p className="w-20 text-right font-semibold text-forest-green">
          {formatPrice(item.price * item.quantity)}
        </p>
        <button
          onClick={() => removeItem(item.productId)}
          aria-label="Remove item"
          className="rounded-full p-1 text-foreground/40 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}