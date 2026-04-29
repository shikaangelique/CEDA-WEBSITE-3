import clsx from 'clsx'
import Eyebrow from './Eyebrow'
import TextAppear from './TextAppear'

export default function SectionHeader({ kicker, title, intro, number, className = '' }) {
  return (
    <header
      className={clsx(
        'grid gap-6 border-t border-[var(--color-line)] pt-8 md:grid-cols-[7rem_1fr]',
        className,
      )}
    >
      <div>
        {number ? (
          <span className="font-mono text-xs tracking-[0.12em] text-[var(--color-accent)]">
            {number}
          </span>
        ) : null}
      </div>
      <div className="max-w-4xl">
        {kicker ? <Eyebrow className="mb-5">{kicker}</Eyebrow> : null}
        {title ? (
          <TextAppear as="h2" className="heading-xl text-[var(--color-text)]">
            {title}
          </TextAppear>
        ) : null}
        {intro ? (
          <TextAppear className="body-lg mt-6 max-w-3xl" delay={0.08}>
            {intro}
          </TextAppear>
        ) : null}
      </div>
    </header>
  )
}
