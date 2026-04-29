import { Newspaper } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../ui/Card'

export function formatPostDate(value) {
  if (!value) return ''

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export default function NewsCard({ post }) {
  const href = `/news/${post.slug}`
  const date = formatPostDate(post.published_at || post.date)

  return (
    <Card className="group flex h-full flex-col overflow-hidden p-0">
      <Link to={href} className="flex h-full flex-col">
        <div className="aspect-[16/10] overflow-hidden bg-[var(--color-bg-elevated)]">
          {post.cover_image_url ? (
            <img
              src={post.cover_image_url}
              alt=""
              className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Newspaper className="text-[var(--color-accent)]" size={44} strokeWidth={1.3} />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          {date ? <p className="eyebrow">{date}</p> : null}
          <h3 className="mt-5 text-2xl font-medium leading-tight text-[var(--color-text)]">
            {post.title}
          </h3>
          {post.excerpt ? <p className="body-md mt-5">{post.excerpt}</p> : null}
          <span className="mt-auto pt-8 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)] transition group-hover:text-[var(--color-accent-bright)]">
            Read update
          </span>
        </div>
      </Link>
    </Card>
  )
}
