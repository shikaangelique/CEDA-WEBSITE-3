import { useParams } from 'react-router-dom'
import PublicationGrid from '../components/publications/PublicationGrid'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import { usePublicationById } from '../hooks/usePublicationById'

function normalizeList(value) {
  if (!value) return []
  if (Array.isArray(value)) return value

  return String(value)
    .split(/\n|;/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export default function PublicationDetailPage() {
  const { id } = useParams()
  const { publication, related, loading, error } = usePublicationById(id)

  if (loading) {
    return (
      <Container className="py-[var(--section-y)]">
        <Card className="min-h-96 animate-pulse" />
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-[var(--section-y)]">
        <Card>
          <p className="eyebrow">Unable to load</p>
          <p className="body-md mt-4">{error.message || 'Publication could not be loaded.'}</p>
        </Card>
      </Container>
    )
  }

  if (!publication) {
    return (
      <Container className="py-[var(--section-y)]">
        <Card>
          <p className="eyebrow">Not found</p>
          <p className="body-md mt-4">This publication could not be found.</p>
        </Card>
      </Container>
    )
  }

  const authors = normalizeList(publication.authors)
  const keyInsights = normalizeList(publication.key_insights)

  return (
    <>
      <PageHero
        eyebrow={publication.type || 'Publication'}
        title={publication.title}
        subtitle={publication.abstract}
        image={publication.thumbnail_url || '/assets/hero/publications-hero.jpg'}
        primaryCTA={
          publication.file_url
            ? {
                label: 'Download',
                href: publication.file_url,
              }
            : null
        }
      />

      <section className="border-b border-[var(--color-line)]">
        <Container className="grid gap-10 py-[var(--section-y)] lg:grid-cols-[0.75fr_1.25fr]">
          <aside>
            <Card>
              <p className="eyebrow">Publication details</p>
              <dl className="mt-6 grid gap-5 text-sm">
                {publication.year ? (
                  <div>
                    <dt className="text-[var(--color-text-faint)]">Year</dt>
                    <dd className="mt-1 text-[var(--color-text)]">{publication.year}</dd>
                  </div>
                ) : null}
                {publication.type ? (
                  <div>
                    <dt className="text-[var(--color-text-faint)]">Type</dt>
                    <dd className="mt-1 text-[var(--color-text)]">{publication.type}</dd>
                  </div>
                ) : null}
                {publication.theme ? (
                  <div>
                    <dt className="text-[var(--color-text-faint)]">Theme</dt>
                    <dd className="mt-1 text-[var(--color-text)]">{publication.theme}</dd>
                  </div>
                ) : null}
                {authors.length ? (
                  <div>
                    <dt className="text-[var(--color-text-faint)]">Authors</dt>
                    <dd className="mt-1 text-[var(--color-text)]">{authors.join(', ')}</dd>
                  </div>
                ) : null}
              </dl>
              {publication.file_url ? (
                <Button className="mt-8 w-full" href={publication.file_url}>
                  Download
                </Button>
              ) : null}
            </Card>
          </aside>

          <div>
            <SectionHeader title="Abstract" />
            {publication.abstract ? (
              <p className="body-lg mt-10">{publication.abstract}</p>
            ) : (
              <p className="body-md mt-10">No abstract is available for this publication.</p>
            )}

            <div className="mt-16">
              <SectionHeader title="Key insights" />
              {keyInsights.length ? (
                <div className="mt-10 grid gap-4">
                  {keyInsights.map((insight, index) => (
                    <Card key={insight}>
                      <p className="font-mono text-xs tracking-[0.12em] text-[var(--color-accent)]">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <p className="body-md mt-4">{insight}</p>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="body-md mt-10">No key insights are available for this publication.</p>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-[var(--section-y)]">
          <SectionHeader title="Related reports" />
          <div className="mt-10">
            <PublicationGrid publications={related} loading={false} error={null} />
          </div>
        </Container>
      </section>
    </>
  )
}
