import { Navigate, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import { getProjectSpotlight } from '../data/projectSpotlights'

export default function ProjectSpotlightPage() {
  const { slug } = useParams()
  const project = getProjectSpotlight(slug)

  if (!project) {
    return <Navigate to="/news" replace />
  }

  return (
    <>
      <PageHero
        eyebrow="Project in spotlight"
        title={project.title}
        subtitle={project.summary}
        image={project.heroImage}
      />

      <section className="border-b border-[var(--color-line)]">
        <Container className="grid gap-8 py-[var(--section-y)] lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="flex min-h-[34rem] flex-col justify-between">
            <div>
              <p className="eyebrow">{project.status}</p>
              <div className="mt-8 flex h-28 items-center rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-[rgba(255,255,255,0.04)] p-5">
                <img src={project.logo} alt={project.partner} className="max-h-20 max-w-56 object-contain" />
              </div>
              {project.objectives ? (
                <div className="mt-8 border-t border-[var(--color-line)] pt-6">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">
                    {project.objectiveLabel || 'Objectives of the study'}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {project.objectives.map((objective) => (
                      <li key={objective} className="grid grid-cols-[0.75rem_1fr] gap-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            <div className="mt-8">
              <p className="text-sm text-[var(--color-text-faint)]">Partner</p>
              <h2 className="mt-2 text-3xl font-medium text-[var(--color-text)]">{project.partner}</h2>
            </div>
          </Card>

          <div>
            <SectionHeader title="Findings and highlights" intro={project.summary} />
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {project.highlights.map((highlight) => (
                <Card
                  key={typeof highlight === 'string' ? highlight : highlight.title}
                  className="min-h-72"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">
                    {typeof highlight === 'string' ? 'Highlight' : highlight.label}
                  </p>
                  <div className="mt-5">
                    <h3 className="text-xl font-medium leading-snug text-[var(--color-text)]">
                      {typeof highlight === 'string' ? highlight : highlight.title}
                    </h3>
                    {typeof highlight === 'string' ? null : (
                      <p className="body-md mt-4">{highlight.text}</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-[var(--section-y)]">
          <SectionHeader
            title={project.fieldTitle || 'Views from project site visits'}
            intro={project.fieldIntro}
          />
          <div className="mt-14 space-y-5">
            {project.gallery.map((image, index) => (
              <Card
                key={image.src}
                className="grid min-h-[24rem] overflow-hidden p-0 md:grid-cols-[0.95fr_1.05fr]"
              >
                <div
                  className={[
                    'aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[24rem]',
                    index % 2 === 1 ? 'md:order-2' : '',
                  ].join(' ')}
                >
                  <img src={image.src} alt={image.title} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div
                  className={[
                    'flex flex-col justify-center p-6 md:p-8 lg:p-10',
                    index % 2 === 1 ? 'md:order-1' : '',
                  ].join(' ')}
                >
                  <p className="eyebrow">{project.shortName} project spotlight</p>
                  <h3 className="mt-5 text-2xl font-medium leading-tight text-[var(--color-text)] md:text-3xl">
                    {image.title}
                  </h3>
                  <p className="body-md mt-5 max-w-2xl">{image.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--color-line)] bg-[rgba(17,21,15,0.42)]">
        <Container className="py-16">
          <div className="grid gap-6 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[rgba(24,29,22,0.72)] p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <p className="eyebrow">Connect with the project</p>
              <h2 className="mt-4 text-3xl font-medium leading-tight text-[var(--color-text)]">
                Partnership opportunities and project deliverables
              </h2>
              <p className="body-md mt-4 max-w-3xl">
                For more information on the project, partnership opportunities, or to access
                published deliverables, contact us.
              </p>
            </div>
            <Button href="/contact">Contact us</Button>
          </div>
        </Container>
      </section>
    </>
  )
}
