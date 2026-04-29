import { FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../ui/Card'

function getPublicationPath(publication) {
  return `/resource-centre/publications/${publication.slug || publication.id}`
}

export default function PublicationCard({ publication }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden p-0">
      <Link to={getPublicationPath(publication)} className="flex h-full flex-col">
        <div className="aspect-[4/3] overflow-hidden bg-[var(--color-bg-elevated)]">
          {publication.thumbnail_url ? (
            <img
              src={publication.thumbnail_url}
              alt=""
              className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <FileText className="text-[var(--color-accent)]" size={44} strokeWidth={1.3} />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap gap-2">
            {publication.type ? (
              <span className="rounded-full border border-[var(--color-line)] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[var(--color-accent)]">
                {publication.type}
              </span>
            ) : null}
            {publication.year ? (
              <span className="rounded-full border border-[var(--color-line)] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[var(--color-text-faint)]">
                {publication.year}
              </span>
            ) : null}
          </div>

          <h3 className="mt-5 text-xl font-medium leading-tight text-[var(--color-text)]">
            {publication.title}
          </h3>

          {publication.theme ? (
            <p className="mt-4 text-sm text-[var(--color-secondary)]">{publication.theme}</p>
          ) : null}

          {publication.abstract ? (
            <p className="body-md mt-4 line-clamp-4">{publication.abstract}</p>
          ) : null}

          <span className="mt-auto pt-8 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)] transition group-hover:text-[var(--color-accent-bright)]">
            View publication
          </span>
        </div>
      </Link>
    </Card>
  )
}
