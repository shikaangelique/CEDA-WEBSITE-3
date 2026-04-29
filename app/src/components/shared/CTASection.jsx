import Button from '../ui/Button'
import Container from '../ui/Container'
import TextAppear from '../ui/TextAppear'

export default function CTASection({ title = 'Get in touch', text, cta }) {
  return (
    <section className="border-t border-[var(--color-line)] bg-[rgba(17,21,15,0.52)]">
      <Container className="grid gap-8 py-[var(--section-y)] md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <TextAppear as="h2" className="heading-xl">
          {title}
        </TextAppear>
        <div>
          {text ? <TextAppear className="body-lg max-w-2xl">{text}</TextAppear> : null}
          {cta ? (
            <Button className="mt-8" href={cta.href}>
              {cta.label}
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
