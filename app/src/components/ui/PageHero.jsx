import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Button from './Button'
import Container from './Container'
import Eyebrow from './Eyebrow'
import TextAppear from './TextAppear'

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  slides = [],
  primaryCTA,
  secondaryCTA,
  size = 'page',
  className = '',
}) {
  const isLanding = size === 'landing'
  const heroSlides = slides.length ? slides : [{ image, subtitle }]
  const [activeSlide, setActiveSlide] = useState(0)
  const currentSlide = heroSlides[activeSlide] || heroSlides[0]
  const currentTitle = currentSlide?.title ?? (slides.length ? null : title)
  const currentSubtitle = currentSlide?.subhead || currentSlide?.subtitle || subtitle

  useEffect(() => {
    if (heroSlides.length < 2) return undefined

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 6500)

    return () => window.clearInterval(timer)
  }, [heroSlides.length])

  return (
    <section
      className={clsx(
        'relative isolate flex items-end overflow-hidden border-b border-[var(--color-line)]',
        isLanding ? 'min-h-[82vh]' : 'min-h-[58vh]',
        className,
      )}
    >
      {currentSlide?.image ? (
        <>
          <motion.img
            key={currentSlide.image}
            src={currentSlide.image}
            alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70"
            initial={{ opacity: 0, x: '9%', scale: 1.04 }}
            animate={{ opacity: 0.7, x: '0%', scale: 1 }}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[var(--color-bg)] via-[rgba(10,12,10,0.58)] to-[rgba(10,12,10,0.22)]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[rgba(10,12,10,0.86)] via-transparent to-[rgba(10,12,10,0.28)]" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(107,181,120,0.16),transparent_65%)]" />
      )}

      <Container className={clsx('pt-32', isLanding ? 'pb-16 md:pb-24' : 'pb-12 md:pb-16')}>
        <motion.div
          className={clsx(isLanding ? 'max-w-5xl' : 'max-w-4xl')}
          initial={isLanding ? false : { scale: 1.06, y: 18, opacity: 0 }}
          animate={isLanding ? undefined : { scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {eyebrow ? <Eyebrow withLine>{eyebrow}</Eyebrow> : null}
          <div className={clsx(isLanding && 'min-h-[clamp(18rem,34vw,28rem)]')}>
            {currentTitle ? (
              <TextAppear
                key={`hero-title-${currentTitle}`}
                as="h1"
                className={clsx(
                  'mt-8 text-[var(--color-text)]',
                  isLanding ? 'display-lg' : 'heading-xl max-w-4xl',
                )}
              >
                {currentTitle}
              </TextAppear>
            ) : null}
            {currentSubtitle ? (
              <TextAppear
                key={`hero-subtitle-${currentSubtitle}`}
                className={clsx(
                  currentTitle ? 'mt-8' : 'pt-[clamp(6rem,13vw,12rem)]',
                  'max-w-3xl',
                  isLanding
                    ? currentTitle
                      ? 'body-lg max-w-2xl'
                      : 'text-2xl font-light leading-tight text-[var(--color-text-muted)] md:text-4xl'
                    : 'body-lg',
                )}
                delay={0.12}
              >
                {currentSubtitle}
              </TextAppear>
            ) : null}
          </div>
          {(primaryCTA || secondaryCTA) && (
            <div className="mt-10 flex flex-wrap gap-3">
              {primaryCTA ? <Button href={primaryCTA.href}>{primaryCTA.label}</Button> : null}
              {secondaryCTA ? (
                <Button href={secondaryCTA.href} variant="secondary">
                  {secondaryCTA.label}
                </Button>
              ) : null}
            </div>
          )}
          {isLanding && heroSlides.length > 1 ? (
            <div className="mt-10 flex gap-2">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  className={[
                    'h-2.5 rounded-full transition',
                    index === activeSlide
                      ? 'w-10 bg-[var(--color-accent)]'
                      : 'w-2.5 bg-[rgba(232,235,217,0.34)] hover:bg-[rgba(232,235,217,0.55)]',
                  ].join(' ')}
                  aria-label={`Show hero slide ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>
          ) : null}
        </motion.div>
      </Container>
    </section>
  )
}
