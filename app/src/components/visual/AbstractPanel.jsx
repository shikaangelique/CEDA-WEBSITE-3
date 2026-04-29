import clsx from 'clsx'

export default function AbstractPanel({ className = '' }) {
  return (
    <div
      className={clsx(
        'relative min-h-80 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-bg-card)]',
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(107,181,120,0.24),transparent_32%),radial-gradient(circle_at_75%_70%,rgba(201,197,119,0.16),transparent_34%)]" />
      <div className="absolute inset-x-8 top-1/2 h-px bg-[var(--color-line-strong)]" />
      <div className="absolute bottom-8 left-8 right-8 h-px bg-[var(--color-line)]" />
    </div>
  )
}
