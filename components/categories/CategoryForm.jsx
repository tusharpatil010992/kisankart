'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function CategoryForm({ category, action }) {
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
    router.push('/admin/categories');
  }

  return (
    <form action={handleSubmit} className="flex max-w-sm flex-col gap-4">
      <Input id="name" name="name" label="Name" defaultValue={category?.name} required />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : 'Save Category'}
      </Button>
    </form>
  );
}
