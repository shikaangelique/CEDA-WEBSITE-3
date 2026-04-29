import NewsCard from '../components/news/NewsCard'
import AssessmentWidget from '../components/assessment/AssessmentWidget'
import CTASection from '../components/shared/CTASection'
import NumberedItem from '../components/shared/NumberedItem'
import PartnerWall from '../components/shared/PartnerWall'
import PPPStrategyBlock from '../components/shared/PPPStrategyBlock'
import ThematicCard from '../components/shared/ThematicCard'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import TextAppear from '../components/ui/TextAppear'
import { assessmentContent } from '../data/assessmentQuestions'
import { partners } from '../data/partners'
import { pppStrategy } from '../data/pppStrategy'
import { siteContent } from '../data/siteContent'
import { thematicAreas } from '../data/thematicAreas'
import { useFeaturedPublications } from '../hooks/useFeaturedPublications'
import { useNews } from '../hooks/useNews'
import { Link } from 'react-router-dom'

function getPublicationPath(publication) {
  return `/resource-centre/publications/${publication.slug || publication.id}`
}

export default function LandingPage() {
  const { landing } = siteContent
  const { posts: latestPosts, loading: newsLoading, error: newsError } = useNews(3)
  const {
    featured: featuredPublications,
    loading: featuredLoading,
    error: featuredError,
  } = useFeaturedPublications(4)

  return (
    <>
      <PageHero
        eyebrow="Centre for Extractives and Development Africa"
        title={landing.hero.headline}
        subtitle={landing.hero.subhead}
        image="/assets/hero/home-hero.jpeg"
        primaryCTA={{ label: landing.hero.primaryCTA, href: '/resource-centre/publications' }}
        secondaryCTA={{ label: landing.hero.secondaryCTA, href: '/contact' }}
        size="landing"
      />

      <section className="border-b border-[var(--color-line)]">
        <Container className="py-[var(--section-y)]">
          <SectionHeader number="01" title="What we do" />
          <TextAppear className="body-lg mt-12 max-w-4xl">{landing.whatWeDo}</TextAppear>
        </Container>
      </section>

      <section className="border-b border-[var(--color-line)]">
        <Container className="py-[var(--section-y)]">
          <SectionHeader number="02" title="Who we serve" intro={landing.whoWeServe.intro} />
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {landing.whoWeServe.items.map((item) => (
              <NumberedItem key={item.number} number={item.number} title={item.title}>
                {item.text}
              </NumberedItem>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-line)]">
        <Container className="py-[var(--section-y)]">
          <SectionHeader
            number="03"
            title="Thematic areas"
            intro={landing.thematicAreasIntro}
          />
          <div className="mt-14 grid auto-cols-[minmax(20rem,82vw)] grid-flow-col gap-5 overflow-x-auto pb-5 pr-[var(--container-x)] [scrollbar-color:var(--color-accent-dim)_transparent] [scrollbar-width:thin] md:auto-cols-[minmax(24rem,42vw)] xl:auto-cols-[minmax(25rem,1fr)]">
            {thematicAreas.map((area) => (
              <ThematicCard
                key={area.slug}
                title={area.title}
                summary={area.summary}
                path={area.path}
                diagram={area.diagram}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-line)] bg-[rgba(17,21,15,0.42)]">
        <Container className="py-[var(--section-y)]">
          <SectionHeader
            number="04"
            kicker="Assessment"
            title={assessmentContent.title}
            intro={assessmentContent.intro}
          />
          <AssessmentWidget />
        </Container>
      </section>

      <section className="border-b border-[var(--color-line)]">
        <Container className="py-[var(--section-y)]">
          <SectionHeader
            number="05"
            title="Featured work"
            intro={landing.featuredWork.intro}
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {featuredLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <Card
                    key={index}
                    className="min-h-64 animate-pulse bg-[rgba(232,235,217,0.04)]"
                  />
                ))
              : null}

            {!featuredLoading && featuredError ? (
              <Card className="md:col-span-2 lg:col-span-4">
                <p className="eyebrow">Unable to load</p>
                <p className="body-md mt-4">Featured publications could not be loaded.</p>
              </Card>
            ) : null}

            {!featuredLoading && !featuredError && featuredPublications.length
              ? featuredPublications.map((publication) => (
                  <Card
                    key={publication.id || publication.slug}
                    className="group relative min-h-64 overflow-hidden p-0"
                  >
                    <Link
                      to={getPublicationPath(publication)}
                      className="flex min-h-64 flex-col p-6"
                    >
                      <div className="flex min-h-20 items-end justify-between gap-4">
                        <p className="eyebrow pb-1">{publication.year || publication.type}</p>
                        {publication.thumbnail_url ? (
                          <div className="h-20 w-14 shrink-0 overflow-hidden rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-bg-elevated)] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                            <img
                              src={publication.thumbnail_url}
                              alt=""
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                        ) : null}
                      </div>

                      <h3 className="mt-8 text-xl font-medium text-[var(--color-text)]">
                        {publication.title}
                      </h3>
                      <span className="mt-auto inline-block pt-8 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)] transition group-hover:text-[var(--color-accent-bright)]">
                        View publication
                      </span>
                    </Link>
                  </Card>
                ))
              : null}

            {!featuredLoading && !featuredError && !featuredPublications.length ? (
              <Card className="md:col-span-2 lg:col-span-4">
                <p className="eyebrow">No featured publications</p>
                <p className="body-md mt-4">
                  Mark publications as featured in Supabase to show them here.
                </p>
              </Card>
            ) : null}
          </div>
          <Button className="mt-10" href="/resource-centre/publications" variant="secondary">
            {landing.featuredWork.cta}
          </Button>
        </Container>
      </section>

      <section className="border-b border-[var(--color-line)]">
        <Container className="py-[var(--section-y)]">
          <SectionHeader number="06" title="Why us" intro={pppStrategy.subtitle} />
          <PPPStrategyBlock />
        </Container>
      </section>

      <section className="border-b border-[var(--color-line)]">
        <Container className="py-[var(--section-y)]">
          <SectionHeader number="07" title="Our partners" />
          <PartnerWall partners={partners} className="mt-14" />
        </Container>
      </section>

      <section className="border-b border-[var(--color-line)] bg-[rgba(17,21,15,0.42)]">
        <Container className="py-[var(--section-y)]">
          <SectionHeader
            number="08"
            title="News and insights"
            intro={landing.newsAndInsights.intro}
          />
          <div className="mt-14">
            {newsLoading ? (
              <div className="grid gap-5 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="min-h-80 animate-pulse bg-[rgba(232,235,217,0.04)]" />
                ))}
              </div>
            ) : newsError ? (
              <Card>
                <p className="eyebrow">Unable to load</p>
                <p className="body-md mt-4">Latest news could not be loaded.</p>
              </Card>
            ) : latestPosts.length ? (
              <div className="grid gap-5 md:grid-cols-3">
                {latestPosts.map((post) => (
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
          <Button className="mt-10" href="/news" variant="secondary">
            {landing.newsAndInsights.cta}
          </Button>
        </Container>
      </section>

      <CTASection
        title="Get in touch"
        text={landing.getInTouch.text}
        cta={{ label: landing.getInTouch.cta, href: '/contact' }}
      />
    </>
  )
}
