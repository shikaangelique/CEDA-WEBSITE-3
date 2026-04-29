import clsx from 'clsx'
import TextAppear from '../ui/TextAppear'

export default function SplitImageText({ image, alt = '', title, children, reverse = false }) {
  return (
    <section
      className={clsx(
        'grid items-center gap-10 md:grid-cols-2',
        reverse && 'md:[&>*:first-child]:order-2',
      )}
    >
      <div className="min-h-96 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-card)]">
        {image ? <img src={image} alt={alt} className="h-full w-full object-cover" /> : null}
      </div>
      <div>
        {title ? (
          <TextAppear as="h2" className="heading-lg">
            {title}
          </TextAppear>
        ) : null}
        {children ? <div className="body-md mt-6">{children}</div> : null}
      </div>
    </section>
  )
}
