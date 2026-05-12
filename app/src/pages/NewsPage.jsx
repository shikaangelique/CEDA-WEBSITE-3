import NewsCard from '../components/news/NewsCard'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import { projectSpotlights } from '../data/projectSpotlights'
import { siteContent } from '../data/siteContent'
import { useNews } from '../hooks/useNews'
import { Link } from 'react-router-dom'

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
          <SectionHeader
            title="Projects in spotlight"
            intro="Ongoing partner-supported work from the field, told through concise highlights and images."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {projectSpotlights.map((project) => (
              <Card key={project.slug} className="group overflow-hidden p-0">
                <Link to={`/news/project-spotlight/${project.slug}`} className="grid h-full md:grid-cols-[0.95fr_1.05fr]">
                  <div className="aspect-[4/3] overflow-hidden md:aspect-auto">
                    <img
                      src={project.heroImage}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-6">
                    <div>
                      <img src={project.logo} alt={project.partner} className="max-h-12 max-w-40 object-contain" />
                      <p className="eyebrow mt-8">{project.status}</p>
                      <h2 className="mt-4 text-2xl font-medium leading-tight text-[var(--color-text)]">
                        {project.title}
                      </h2>
                    </div>
                    <span className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)] transition group-hover:text-[var(--color-accent-bright)]">
                      View spotlight
                    </span>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          <div className="mt-20">
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
          </div>
        </Container>
      </section>
    </>
  )
}
