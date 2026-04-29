import clsx from 'clsx'

export default function Container({ className = '', as: Component = 'div', ...props }) {
  return (
    <Component
      className={clsx('mx-auto w-full max-w-[var(--site-max)] px-[var(--container-x)]', className)}
      {...props}
    />
  )
}
