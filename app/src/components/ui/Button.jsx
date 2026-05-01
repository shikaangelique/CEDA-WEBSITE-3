import clsx from 'clsx'
import { Link } from 'react-router-dom'

const variants = {
  primary:
    'border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-bg)] hover:bg-[var(--color-accent-bright)] hover:border-[var(--color-accent-bright)]',
  secondary:
    'border-[var(--color-line-strong)] bg-[rgba(232,235,217,0.04)] text-[var(--color-text)] hover:border-[var(--color-accent-dim)] hover:bg-[rgba(107,181,120,0.1)]',
  ghost:
    'border-transparent bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-line)]',
}

export default function Button({
  variant = 'primary',
  className = '',
  href,
  type = 'button',
  ...props
}) {
  const classes = clsx(
    'inline-flex min-h-11 items-center justify-center rounded-[var(--radius-sm)] border px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.12em] transition duration-300 ease-[var(--ease-out)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]',
    variants[variant],
    className,
  )

  if (href) {
    if (href.startsWith('/')) {
      return <Link className={classes} to={href} {...props} />
    }

    return <a className={classes} href={href} {...props} />
  }

  return <button className={classes} type={type} {...props} />
}
