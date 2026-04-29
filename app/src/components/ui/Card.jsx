import clsx from 'clsx'

export default function Card({ className = '', ...props }) {
  return (
    <div
      className={clsx(
        'rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[rgba(24,29,22,0.72)] p-6 transition duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-[var(--color-line-strong)] hover:bg-[var(--color-bg-card)]',
        className,
      )}
      {...props}
    />
  )
}
