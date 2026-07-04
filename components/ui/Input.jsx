import clsx from 'clsx';

export default function Input({ label, error, className, id, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground/80">
          {label}
        </label>
      )}
      <input
        id={id}
        className={clsx(
          'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/40 transition-colors focus:border-forest-green focus:outline-none focus:ring-2 focus:ring-forest-green/20',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
