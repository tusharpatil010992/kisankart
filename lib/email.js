import { Resend } from 'resend';
import { formatPrice } from '@/lib/utils';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(order, items) {
  const itemLines = items
    .map((item) => `${item.product_name} × ${item.quantity}: ${formatPrice(item.price_at_purchase * item.quantity)}`)
    .join('\n');

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: order.customer_email,
    subject: `Order Confirmation - ${order.id}`,
    text: `Hi ${order.customer_name},

Thank you for your order on KisanKart!

Order Details:
- Order ID: ${order.id}
- Order Date: ${new Date(order.created_at).toLocaleDateString()}

Items Ordered:
${itemLines}

Total Amount: ${formatPrice(order.total_amount)}

We appreciate your business and look forward to serving you again!

Best regards,
KisanKart Team`,
  });
}
