import Link from 'next/link';
import clsx from 'clsx';

export default function CategoryFilter({ categories, activeCategoryId, query }) {
  function buildHref(categoryId) {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (categoryId) params.set('category', categoryId);
    const qs = params.toString();
    return qs ? `/products?${qs}` : '/products';
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={buildHref(null)}
        className={clsx(
          'rounded-full px-3 py-1 text-sm font-medium',
          !activeCategoryId ? 'bg-forest-green text-white' : 'bg-sage-green/40 text-foreground hover:bg-light-green'
        )}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={buildHref(category.id)}
          className={clsx(
            'rounded-full px-3 py-1 text-sm font-medium',
            activeCategoryId === category.id
              ? 'bg-forest-green text-white'
              : 'bg-sage-green/40 text-foreground hover:bg-light-green'
          )}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
