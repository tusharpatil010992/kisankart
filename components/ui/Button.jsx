import clsx from 'clsx';

const variants = {
  primary: 'bg-forest-green text-white hover:bg-light-green',
  secondary: 'bg-sage-green text-foreground hover:bg-light-green',
  outline: 'border border-forest-green text-forest-green hover:bg-light-gray',
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
        'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
