import { Search } from 'lucide-react';

export default function SearchBar({ defaultValue, categoryId }) {
  return (
    <form action="/products" className="relative flex-1">
      {categoryId && <input type="hidden" name="category" value={categoryId} />}
      <input
        type="text"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search products..."
        className="w-full rounded-md border border-sage-green py-2 pl-10 pr-4 text-sm focus:border-forest-green focus:outline-none focus:ring-1 focus:ring-forest-green"
      />
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-green" />
    </form>
  );
}
