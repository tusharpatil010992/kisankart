'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { categorySchema } from '@/lib/validators';

export async function getCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('categories').select('*').order('name');
  if (error) throw new Error(error.message);
  return data;
}

export async function getCategoryById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('categories').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createCategory(formData) {
  const parsed = categorySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('categories').insert(parsed.data);
  if (error) return { error: error.message };

  revalidatePath('/admin/categories');
  revalidatePath('/products');
  return { success: true };
}

export async function updateCategory(id, formData) {
  const parsed = categorySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('categories').update(parsed.data).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/categories');
  revalidatePath('/products');
  return { success: true };
}

export async function deleteCategory(id) {
  const supabase = await createClient();
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/categories');
  revalidatePath('/products');
  return { success: true };
}
