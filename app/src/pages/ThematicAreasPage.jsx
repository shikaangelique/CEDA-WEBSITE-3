import ThematicCard from '../components/shared/ThematicCard'
import Container from '../components/ui/Container'
import FullFrameImage from '../components/ui/FullFrameImage'
import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import { thematicAreas, thematicAreasOverview } from '../data/thematicAreas'

export default function ThematicAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Thematic areas"
        title="Four areas anchor our work."
        subtitle={thematicAreasOverview.intro}
        image="/assets/hero/thematic-areas-hero.jpg"
      />

      <section className="border-b border-[var(--color-line)]">
        <Container className="py-[var(--section-y)]">
          <SectionHeader title="Our thematic areas" intro={thematicAreasOverview.areasText} />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {thematicAreas.map((area) => (
              <ThematicCard
                key={area.slug}
                title={area.title}
                summary={area.summary}
                path={area.path}
                diagram={area.diagram}
              />
            ))}
          </div>
        </Container>
      </section>

      <FullFrameImage
        src="/assets/images/solar-array-savanna-landscape.jpg"
        alt="Solar array in a savanna landscape"
        caption="Cross-cutting concerns of gender, youth, transparency, and anti-corruption run through all four."
      />
    </>
  )
}
