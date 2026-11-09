import Seo from '../components/seo/Seo'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import Eyebrow from '../components/ui/Eyebrow'

const suggestions = [
  { label: 'Publications', href: '/resource-centre/publications' },
  { label: 'Thematic areas', href: '/thematic-areas' },
  { label: 'News', href: '/news' },
  { label: 'About CEDA', href: '/about' },
]

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" description="The page you were looking for could not be found." noindex />
      <section className="min-h-[70vh] border-b border-[var(--color-line)]">
        <Container className="pb-[var(--section-y)] pt-40">
          <Eyebrow withLine>Error 404</Eyebrow>
          <h1 className="heading-xl mt-6 max-w-3xl text-[var(--color-text)]">
            We couldn’t find that page.
          </h1>
          <p className="body-lg mt-6 max-w-2xl">
            The link may be out of date, or the page may have moved. Try one of these instead.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/">Back to home</Button>
            {suggestions.map((item) => (
              <Button key={item.href} href={item.href} variant="secondary">
                {item.label}
              </Button>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
