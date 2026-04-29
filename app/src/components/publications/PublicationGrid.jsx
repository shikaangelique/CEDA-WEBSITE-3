import Card from '../ui/Card'
import PublicationCard from './PublicationCard'

export default function PublicationGrid({ publications = [], loading = false, error = null }) {
  if (loading) {
    return (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="min-h-96 animate-pulse bg-[rgba(232,235,217,0.04)]" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <p className="eyebrow">Unable to load</p>
        <p className="body-md mt-4">{error.message || 'Publications could not be loaded.'}</p>
      </Card>
    )
  }

  if (!publications.length) {
    return (
      <Card>
        <p className="eyebrow">No results</p>
        <p className="body-md mt-4">No publications match the current filters.</p>
      </Card>
    )
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {publications.map((publication) => (
        <PublicationCard key={publication.id || publication.slug || publication.title} publication={publication} />
      ))}
    </div>
  )
}
