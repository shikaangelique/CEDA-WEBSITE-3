import NumberedItem from '../components/shared/NumberedItem'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import FullFrameImage from '../components/ui/FullFrameImage'
import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import TextAppear from '../components/ui/TextAppear'
import { siteContent } from '../data/siteContent'

export default function AboutPage() {
  const { about } = siteContent

  return (
    <>
      <PageHero
        eyebrow="About CEDA"
        title="Better governance of Africa's mineral and petroleum resources."
        subtitle={about.intro}
        image="/assets/hero/about-hero.jpg"
      />

      <section className="border-b border-[var(--color-line)]">
        <Container className="grid gap-5 py-[var(--section-y)] md:grid-cols-3">
          {[
            ['Vision', about.vision],
            ['Mission', about.mission],
            ['Goal', about.goal],
          ].map(([title, text]) => (
            <Card key={title}>
              <p className="eyebrow">{title}</p>
              <TextAppear className="body-md mt-6">{text}</TextAppear>
            </Card>
          ))}
        </Container>
      </section>

      <section className="border-b border-[var(--color-line)]">
        <Container className="py-[var(--section-y)]">
          <SectionHeader title="Broad objectives" number="01" />
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {about.broadObjectives.map((objective, index) => (
              <NumberedItem key={objective} number={String(index + 1).padStart(2, '0')} title={objective} />
            ))}
          </div>
        </Container>
      </section>

      <FullFrameImage
        src="/assets/images/mineral-specimen-crystalline.jpg"
        alt="Crystalline mineral specimen"
        caption="Evidence, communities, and governance sit at the centre of CEDA's work."
      />

      <section className="border-b border-[var(--color-line)]">
        <Container className="py-[var(--section-y)]">
          <SectionHeader
            title="Operational areas"
            intro={about.operationalAreasIntro}
            number="02"
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-5">
            {about.operationalAreas.map((area, index) => (
              <Card key={area.title}>
                <p className="font-mono text-xs tracking-[0.12em] text-[var(--color-accent)]">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-5 text-xl font-medium text-[var(--color-text)]">{area.title}</h3>
                <p className="body-md mt-4">{area.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-[var(--section-y)]">
          <SectionHeader title="Core values" intro={about.coreValuesIntro} number="03" />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-3">
            {about.coreValues.map((value) => (
              <div key={value} className="bg-[var(--color-bg-card)] p-6 text-[var(--color-text)]">
                {value}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
