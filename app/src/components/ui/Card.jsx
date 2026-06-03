import clsx from 'clsx'

export default function Card({ className = '', ...props }) {
  return (
    <div
      className={clsx(
        'rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[rgba(251,252,247,0.88)] p-6 shadow-[0_18px_48px_rgba(24,49,38,0.06)] transition duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-[var(--color-line-strong)] hover:bg-[var(--color-bg-card)]',
        className,
      )}
      {...props}
    />
  )
}
