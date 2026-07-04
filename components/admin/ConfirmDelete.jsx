'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfirmDelete({ action, id, itemName, children }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    if (!window.confirm(`Delete "${itemName}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const result = await action(id);
      if (result?.error) {
        window.alert(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className="text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
    >
      {children ?? (pending ? 'Deleting...' : 'Delete')}
    </button>
  );
}
