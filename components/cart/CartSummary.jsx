import { formatPrice } from '@/lib/utils';

export default function CartSummary({ total }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-gradient-green-soft p-4">
      <div className="flex justify-between text-foreground/80">
        <span>Subtotal</span>
        <span>{formatPrice(total)}</span>
      </div>
      <div className="flex justify-between text-lg font-semibold text-forest-green">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
