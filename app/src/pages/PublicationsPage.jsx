import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterBar from '../components/publications/FilterBar'
import PublicationGrid from '../components/publications/PublicationGrid'
import Container from '../components/ui/Container'
import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import { siteContent } from '../data/siteContent'
import { usePublications } from '../hooks/usePublications'

function uniqueValues(publications, key) {
  return [
    ...new Set(
      publications
        .map((publication) => publication[key])
        .filter(Boolean)
        .map(String),
    ),
  ].sort((a, b) => a.localeCompare(b))
}

export default function PublicationsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = {
    search: searchParams.get('search') || '',
    theme: searchParams.get('theme') || '',
    type: searchParams.get('type') || '',
    year: searchParams.get('year') || '',
  }

  const { publications, loading, error } = usePublications(filters)

  const options = useMemo(
    () => ({
      themes: uniqueValues(publications, 'theme'),
      types: uniqueValues(publications, 'type'),
      years: uniqueValues(publications, 'year').sort((a, b) => Number(b) - Number(a)),
    }),
    [publications],
  )

  function updateFilters(next) {
    const params = new URLSearchParams(searchParams)

    Object.entries(next).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    setSearchParams(params)
  }

  function resetFilters() {
    setSearchParams({})
  }

  return (
    <>
      <PageHero
        eyebrow="Resource Centre"
        title="Publications"
        subtitle={siteContent.resourceCentre.overview}
        image="/assets/hero/publications-hero.jpg"
      />

      <section>
        <Container className="py-[var(--section-y)]">
          <SectionHeader
            title="Research and Policy Papers"
            intro="The full publications directory with search, filters, and download."
          />
          <div className="mt-12">
            <FilterBar
              filters={filters}
              options={options}
              onChange={updateFilters}
              onReset={resetFilters}
            />
          </div>
          <div className="mt-10">
            <PublicationGrid publications={publications} loading={loading} error={error} />
          </div>
        </Container>
      </section>
    </>
  )
}
