'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

export default function ProductForm({ product, categories, action }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(formData) {
    setSubmitting(true);
    const result = await action(formData);
    setSubmitting(false);

    if (result?.error) {
      setError(result.error);
      return;
    }
    router.push('/admin/products');
  }

  return (
    <form action={handleSubmit} className="flex max-w-lg flex-col gap-4">
      <Input id="name" name="name" label="Name" defaultValue={product?.name} required />
      <Textarea
        id="description"
        name="description"
        label="Description"
        rows={4}
        defaultValue={product?.description}
      />
      <Input
        id="price"
        name="price"
        type="number"
        step="0.01"
        label="Price"
        defaultValue={product?.price}
        required
      />
      <Input
        id="image_url"
        name="image_url"
        label="Image URL"
        defaultValue={product?.image_url}
      />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="category_id" className="text-sm font-medium text-foreground/80">
          Category
        </label>
        <select
          id="category_id"
          name="category_id"
          defaultValue={product?.category_id}
          required
          className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-foreground transition-colors focus:border-forest-green focus:outline-none focus:ring-2 focus:ring-forest-green/20"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : 'Save Product'}
      </Button>
    </form>
  );
}
