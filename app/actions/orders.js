'use server';

import { createClient } from '@/lib/supabase/server';
import { checkoutSchema } from '@/lib/validators';
import { sendOrderConfirmation } from '@/lib/email';

export async function createOrder({ customerName, customerEmail, items }) {
  const parsed = checkoutSchema.safeParse({
    customer_name: customerName,
    customer_email: customerEmail,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }
  if (!items?.length) {
    return { error: 'Your cart is empty' };
  }

  const supabase = await createClient();

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_name: parsed.data.customer_name,
      customer_email: parsed.data.customer_email,
      total_amount: totalAmount,
    })
    .select()
    .single();

  if (orderError) return { error: orderError.message };

  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    quantity: item.quantity,
    price_at_purchase: item.price,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
  if (itemsError) return { error: itemsError.message };

  try {
    await sendOrderConfirmation(
      order,
      items.map((item) => ({
        product_name: item.name,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }))
    );
  } catch (emailError) {
    console.error('Order confirmation email failed:', emailError);
  }

  return { success: true, orderId: order.id };
}
