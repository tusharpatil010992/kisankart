import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.coerce.number().positive('Price must be greater than 0'),
  image_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  category_id: z.string().uuid('Select a category'),
});

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export const checkoutSchema = z.object({
  customer_name: z.string().min(1, 'Name is required'),
  customer_email: z.string().email('Enter a valid email'),
});
