import NewsCard from '../components/news/NewsCard'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import { siteContent } from '../data/siteContent'
import { useNews } from '../hooks/useNews'

export default function NewsPage() {
  const { posts, loading, error } = useNews()

  return (
    <>
      <PageHero
        eyebrow="News and Media"
        title="News, blog posts, event coverage, and updates."
        subtitle={siteContent.news.intro}
        image="/assets/hero/news-hero.jpg"
      />

      <section>
        <Container className="py-[var(--section-y)]">
          <SectionHeader title="Latest updates" intro={siteContent.news.intro} />

          <div className="mt-14">
            {loading ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="min-h-96 animate-pulse bg-[rgba(232,235,217,0.04)]" />
                ))}
              </div>
            ) : error ? (
              <Card>
                <p className="eyebrow">Unable to load</p>
                <p className="body-md mt-4">{error.message || 'News posts could not be loaded.'}</p>
              </Card>
            ) : posts.length ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <NewsCard key={post.id || post.slug} post={post} />
                ))}
              </div>
            ) : (
              <Card>
                <p className="eyebrow">No posts yet</p>
                <p className="body-md mt-4">No news posts are available right now.</p>
              </Card>
            )}
          </div>
        </Container>
      </section>
    </>
  )
}
