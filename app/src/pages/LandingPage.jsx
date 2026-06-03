import NewsCard from '../components/news/NewsCard'
import AssessmentWidget from '../components/assessment/AssessmentWidget'
import CTASection from '../components/shared/CTASection'
import NumberedItem from '../components/shared/NumberedItem'
import PartnerWall from '../components/shared/PartnerWall'
import PPPStrategyBlock from '../components/shared/PPPStrategyBlock'
import QuoteCarousel from '../components/shared/QuoteCarousel'
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
        slides={landing.hero.slides}
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

      <section className="border-b border-[var(--color-line)] bg-[rgba(228,236,225,0.58)]">
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
                    className="min-h-64 animate-pulse border-[rgba(47,102,81,0.18)] bg-[linear-gradient(145deg,rgba(63,125,100,0.94),rgba(47,102,81,0.9))]"
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
                    className="group relative min-h-[20rem] overflow-hidden border-[rgba(47,102,81,0.18)] bg-[linear-gradient(155deg,rgba(63,125,100,0.96),rgba(47,102,81,0.92)_58%,rgba(35,77,61,0.98))] p-0 shadow-[0_26px_64px_rgba(24,49,38,0.14)]"
                  >
                    <Link
                      to={getPublicationPath(publication)}
                      className="flex min-h-[20rem] h-full flex-col p-6"
                    >
                      <div className="flex min-h-20 items-end justify-between gap-4">
                        <p className="pb-1 font-mono text-xs uppercase tracking-[0.12em] text-[rgba(246,247,241,0.74)]">
                          {publication.year || publication.type}
                        </p>
                        {publication.thumbnail_url ? (
                          <div className="h-20 w-14 shrink-0 overflow-hidden rounded-[var(--radius-sm)] border border-[rgba(246,247,241,0.18)] bg-[rgba(246,247,241,0.12)] shadow-[0_12px_30px_rgba(24,49,38,0.22)]">
                            <img
                              src={publication.thumbnail_url}
                              alt=""
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                        ) : null}
                      </div>

                      <h3 className="mt-8 text-xl font-medium text-[var(--color-accent-contrast)]">
                        {publication.title}
                      </h3>
                      <div className="mt-auto pt-8">
                        <span className="inline-flex min-h-10 items-center rounded-[var(--radius-sm)] border border-[rgba(246,247,241,0.18)] bg-[rgba(246,247,241,0.08)] px-4 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent-contrast)] transition group-hover:border-[rgba(246,247,241,0.34)] group-hover:bg-[rgba(246,247,241,0.14)]">
                          View publication
                        </span>
                      </div>
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
          <p className="mt-4 text-sm text-[var(--color-text-faint)]">
            Hover over a logo to view it in full colour.
          </p>
        </Container>
      </section>

      <section className="border-b border-[var(--color-line)] bg-[rgba(228,236,225,0.54)]">
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

      <section className="border-b border-[var(--color-line)]">
        <Container className="py-[var(--section-y)]">
          <SectionHeader
            number="09"
            title="What leaders are saying"
          />
          <div className="mt-14">
            <QuoteCarousel />
          </div>
        </Container>
      </section>

      <CTASection
        background="rgba(63,125,100,0.42)"
        title="Get in touch"
        text={landing.getInTouch.text}
        cta={{ label: landing.getInTouch.cta, href: '/contact' }}
      />
    </>
  )
}
