import { Link } from 'react-router-dom';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-body font-semibold text-[15px] transition-all duration-200 focus-visible:outline-offset-4 disabled:opacity-50 disabled:pointer-events-none';

const VARIANTS = {
  primary: 'bg-forest text-cream shadow-soft hover:bg-forest-light hover:shadow-lift hover:-translate-y-0.5',
  secondary:
    'bg-transparent text-forest border-2 border-forest/30 hover:border-forest hover:bg-forest/5',
  terracotta:
    'bg-terracotta text-white shadow-soft hover:bg-terracotta-dark hover:shadow-lift hover:-translate-y-0.5',
  ghost: 'bg-white/90 text-forest border border-forest/15 hover:bg-white',
};

/**
 * Shared CTA button. Renders a <Link> for internal routes, an <a> for
 * external/tel/mailto/wa.me links, or a <button> when `onClick` is given
 * with no `to`/`href`.
 */
export function PrimaryButton({
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  icon: Icon,
  iconPosition = 'right',
  className = '',
  children,
  external = false,
  ...rest
}) {
  const classes = `${BASE} ${VARIANTS[variant] ?? VARIANTS.primary} ${className}`;
  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon size={18} aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={18} aria-hidden="true" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {content}
    </button>
  );
}

export default PrimaryButton;
