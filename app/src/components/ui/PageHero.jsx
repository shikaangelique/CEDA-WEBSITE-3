import clsx from 'clsx'
import { motion } from 'framer-motion'
import Button from './Button'
import Container from './Container'
import Eyebrow from './Eyebrow'
import TextAppear from './TextAppear'

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  primaryCTA,
  secondaryCTA,
  size = 'page',
  className = '',
}) {
  const isLanding = size === 'landing'

  return (
    <section
      className={clsx(
        'relative isolate flex items-end overflow-hidden border-b border-[var(--color-line)]',
        isLanding ? 'min-h-[82vh]' : 'min-h-[58vh]',
        className,
      )}
    >
      {image ? (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70"
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
          {title ? (
            <TextAppear
              key={`hero-title-${title}`}
              as="h1"
              className={clsx(
                'mt-8 text-[var(--color-text)]',
                isLanding ? 'display-lg' : 'heading-xl max-w-4xl',
              )}
            >
              {title}
            </TextAppear>
          ) : null}
          {subtitle ? (
            <TextAppear
              key={`hero-subtitle-${subtitle}`}
              className="body-lg mt-8 max-w-2xl"
              delay={0.12}
            >
              {subtitle}
            </TextAppear>
          ) : null}
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
        </motion.div>
      </Container>
    </section>
  )
}
