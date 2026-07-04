import clsx from 'clsx';

const variants = {
  primary: 'bg-gradient-green-strong text-white shadow-sm hover:shadow-md hover:brightness-105',
  secondary: 'bg-sage-green text-forest-green hover:bg-light-green hover:text-white',
  outline: 'border border-forest-green text-forest-green hover:bg-sage-green/40',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
