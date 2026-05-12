import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { homepageQuotes } from '../../data/homepageQuotes'
import Card from '../ui/Card'

export default function QuoteCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeQuote = homepageQuotes[activeIndex]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % homepageQuotes.length)
    }, 7000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <Card className="overflow-hidden p-0">
      <div className="grid min-h-[15rem] lg:grid-cols-[0.38fr_0.62fr]">
        <div className="flex flex-col justify-between border-b border-[var(--color-line)] bg-[rgba(232,235,217,0.05)] p-4 lg:border-b-0 lg:border-r">
          <div>
            <p className="eyebrow">Quote deck</p>
            <h3 className="mt-3 text-xl font-medium leading-tight text-[var(--color-text)]">
              Voices shaping extractives, energy, and governance.
            </h3>
          </div>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {homepageQuotes.map((quote, index) => (
              <button
                key={`${quote.author}-${quote.quote}`}
                type="button"
                className={[
                  'h-2 rounded-full transition',
                  index === activeIndex
                    ? 'w-6 bg-[var(--color-accent)]'
                    : 'w-2 bg-[rgba(232,235,217,0.22)] hover:bg-[rgba(232,235,217,0.4)]',
                ].join(' ')}
                aria-label={`Show quote ${index + 1}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(107,181,120,0.14),transparent_32%),linear-gradient(135deg,rgba(232,235,217,0.08),rgba(17,21,15,0.92))] p-5 md:p-6">
          <motion.div
            key={activeQuote.quote}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full min-h-[18rem] flex-col justify-between md:min-h-[16rem]"
          >
            <blockquote className="line-clamp-5 font-serif text-xl font-light leading-tight text-[var(--color-text)] md:text-3xl">
              “{activeQuote.quote}”
            </blockquote>
            <div className="mt-6 border-t border-[rgba(232,235,217,0.18)] pt-4">
              <p className="text-base font-medium text-[var(--color-text)]">{activeQuote.author}</p>
              <p className="mt-1 text-xs leading-5 text-[var(--color-text-muted)]">{activeQuote.role}</p>
              <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[var(--color-text-faint)]">
                {activeQuote.source}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Card>
  )
}
