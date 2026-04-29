import { Link, Navigate, useParams } from 'react-router-dom'
import StrategyFramework from '../components/strategy/StrategyFramework'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import TextAppear from '../components/ui/TextAppear'
import { thematicAreas } from '../data/thematicAreas'

export default function ThematicAreaDetail() {
  const { slug } = useParams()
  const area = thematicAreas.find((item) => item.slug === slug)

  if (!area) {
    return <Navigate to="/thematic-areas" replace />
  }

  const relatedAreas = thematicAreas.filter((item) => item.slug !== area.slug)

  return (
    <>
      <PageHero
        eyebrow="Thematic area"
        title={area.title}
        subtitle={area.summary}
        image={area.heroImage}
      />

      <section className="border-b border-[var(--color-line)]">
        <Container className="grid gap-12 py-[var(--section-y)] lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader title="Overview" />
          <div className="space-y-8">
            {area.body.map((paragraph) => (
              <TextAppear key={paragraph} className="body-lg">
                {paragraph}
              </TextAppear>
            ))}
          </div>
        </Container>
      </section>

      {area.slug === 'climate-energy-transition' ? <StrategyFramework /> : null}

      <section>
        <Container className="py-[var(--section-y)]">
          <SectionHeader title="Related thematic areas" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {relatedAreas.map((related) => (
              <Card key={related.slug}>
                <h3 className="text-xl font-medium text-[var(--color-text)]">{related.title}</h3>
                <Link
                  to={related.path}
                  className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]"
                >
                  View area
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
