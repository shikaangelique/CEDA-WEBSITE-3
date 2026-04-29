import clsx from 'clsx'

export default function NumberedItem({ number, title, children, className = '' }) {
  return (
    <article className={clsx('border-t border-[var(--color-line)] pt-6', className)}>
      <p className="font-mono text-xs tracking-[0.12em] text-[var(--color-accent)]">{number}</p>
      <h3 className="mt-5 text-xl font-medium text-[var(--color-text)]">{title}</h3>
      <div className="body-md mt-4">{children}</div>
    </article>
  )
}
