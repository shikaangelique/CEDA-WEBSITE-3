import clsx from 'clsx'

export default function ImageMarquee({ images = [], className = '' }) {
  if (!images.length) {
    return <div className={clsx('min-h-72 bg-[var(--color-bg-card)]', className)} />
  }

  return (
    <div className={clsx('overflow-hidden', className)}>
      <div className="flex gap-4">
        {images.map((image) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt || ''}
            className="h-72 w-[26rem] shrink-0 rounded-[var(--radius-md)] object-cover"
          />
        ))}
      </div>
    </div>
  )
}
