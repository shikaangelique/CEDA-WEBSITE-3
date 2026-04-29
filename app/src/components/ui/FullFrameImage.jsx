import clsx from 'clsx'
import Container from './Container'

export default function FullFrameImage({
  src,
  alt = '',
  caption,
  height = 'min-h-[78vh]',
  overlay = true,
  className = '',
}) {
  return (
    <figure className={clsx('relative isolate overflow-hidden', height, className)}>
      {src ? (
        <img src={src} alt={alt} className="absolute inset-0 -z-20 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 -z-20 bg-[var(--color-bg-card)]" />
      )}
      {overlay ? (
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgba(10,12,10,0.76)] via-transparent to-[rgba(10,12,10,0.22)]" />
      ) : null}
      {caption ? (
        <Container className="flex min-h-[inherit] items-end pb-8">
          <figcaption className="max-w-xl font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
            {caption}
          </figcaption>
        </Container>
      ) : null}
    </figure>
  )
}
