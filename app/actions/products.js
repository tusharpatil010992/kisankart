'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { productSchema } from '@/lib/validators';

export async function getProducts({ categoryId, query } = {}) {
  const supabase = await createClient();
  let request = supabase
    .from('products')
    .select('*, categories(id, name)')
    .order('created_at', { ascending: false });

  if (categoryId) request = request.eq('category_id', categoryId);
  if (query) request = request.ilike('name', `%${query}%`);

  const { data, error } = await request;
  if (error) throw new Error(error.message);
  return data;
}

export async function getProductById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(id, name)')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createProduct(formData) {
  const parsed = productSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('products').insert(parsed.data);
  if (error) return { error: error.message };

  revalidatePath('/admin/products');
  revalidatePath('/products');
  return { success: true };
}

export async function updateProduct(id, formData) {
  const parsed = productSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('products').update(parsed.data).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/products');
  revalidatePath('/products');
  revalidatePath(`/products/${id}`);
  return { success: true };
}

export async function deleteProduct(id) {
  const supabase = await createClient();
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/products');
  revalidatePath('/products');
  return { success: true };
}
