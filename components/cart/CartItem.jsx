'use client';

import { X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center justify-between gap-4 border-b border-sage-green py-4">
      <div className="flex-1">
        <p className="font-medium text-foreground">{item.name}</p>
        <p className="text-sm text-foreground/60">{formatPrice(item.price)} each</p>
      </div>
      <div className="flex items-center rounded-md border border-sage-green">
        <button
          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
          className="px-3 py-1 text-forest-green hover:bg-light-gray"
        >
          −
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
          className="px-3 py-1 text-forest-green hover:bg-light-gray"
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
        className="text-foreground/40 hover:text-red-600"
      >
        <X size={18} />
      </button>
    </div>
  );
}
