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
        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground/40 transition-colors focus:border-forest-green focus:outline-none focus:ring-2 focus:ring-forest-green/20"
      />
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-green" />
    </form>
  );
}
