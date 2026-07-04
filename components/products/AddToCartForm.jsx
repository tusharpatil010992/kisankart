'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import Button from '@/components/ui/Button';

export default function AddToCartForm({ product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center rounded-xl border border-slate-200">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 py-2 text-forest-green transition-colors hover:bg-sage-green/40"
        >
          −
        </button>
        <span className="w-8 text-center">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          className="px-3 py-2 text-forest-green transition-colors hover:bg-sage-green/40"
        >
          +
        </button>
      </div>
      <Button onClick={handleAdd}>{added ? 'Added!' : 'Add to Cart'}</Button>
    </div>
  );
}
