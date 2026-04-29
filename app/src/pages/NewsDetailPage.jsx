import { useParams } from 'react-router-dom'
import { formatPostDate } from '../components/news/NewsCard'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import { useNewsBySlug } from '../hooks/useNewsBySlug'

function getPostBody(post) {
  const body = post.body || post.content || post.article || ''

  if (Array.isArray(body)) return body

  return String(body)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

export default function NewsDetailPage() {
  const { slug } = useParams()
  const { post, loading, error } = useNewsBySlug(slug)

  if (loading) {
    return (
      <Container className="py-[var(--section-y)]">
        <Card className="min-h-96 animate-pulse bg-[rgba(232,235,217,0.04)]" />
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-[var(--section-y)]">
        <Card>
          <p className="eyebrow">Unable to load</p>
          <p className="body-md mt-4">{error.message || 'This news post could not be loaded.'}</p>
        </Card>
      </Container>
    )
  }

  if (!post) {
    return (
      <Container className="py-[var(--section-y)]">
        <Card>
          <p className="eyebrow">Not found</p>
          <p className="body-md mt-4">This news post could not be found.</p>
        </Card>
      </Container>
    )
  }

  const paragraphs = getPostBody(post)
  const date = formatPostDate(post.published_at || post.date)

  return (
    <>
      <PageHero
        eyebrow={date || 'News'}
        title={post.title}
        subtitle={post.excerpt}
        image={post.cover_image_url || '/assets/hero/news-hero.jpg'}
      />

      <section>
        <Container className="grid gap-12 py-[var(--section-y)] lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHeader title="Story" />
          <article className="space-y-7">
            {paragraphs.length ? (
              paragraphs.map((paragraph) => (
                <p key={paragraph} className="body-lg">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="body-md">No article body is available for this post.</p>
            )}
          </article>
        </Container>
      </section>
    </>
  )
}
