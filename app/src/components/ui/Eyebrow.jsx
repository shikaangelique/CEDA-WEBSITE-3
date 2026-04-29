import clsx from 'clsx'

export default function Eyebrow({ children, withLine = false, className = '' }) {
  return (
    <p className={clsx('eyebrow flex items-center gap-4', className)}>
      {withLine ? <span className="h-px w-8 bg-[var(--color-accent)]" /> : null}
      <span>{children}</span>
    </p>
  )
}
