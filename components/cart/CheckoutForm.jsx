'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { createOrder } from '@/app/actions/orders';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function CheckoutForm() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(formData) {
    setSubmitting(true);
    setError(null);

    const result = await createOrder({
      customerName: formData.get('customer_name'),
      customerEmail: formData.get('customer_email'),
      items,
    });

    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    clearCart();
    router.push(`/?order=${result.orderId}`);
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <Input id="customer_name" name="customer_name" label="Full Name" required />
      <Input
        id="customer_email"
        name="customer_email"
        type="email"
        label="Email"
        required
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={submitting || items.length === 0}>
        {submitting ? 'Placing order...' : 'Place Order'}
      </Button>
    </form>
  );
}
