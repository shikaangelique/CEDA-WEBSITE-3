import { ArrowUpRight, FileText } from 'lucide-react'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import PageHero from '../components/ui/PageHero'
import { useAnnualReports } from '../hooks/useAnnualReports'

// Documents whose publications.type is an Annual Reports type (see
// src/lib/publicationTypes.js). Each tile opens the PDF directly.
function formatDate(report) {
  return [report.month, report.year].filter(Boolean).join(' ')
}

export default function AnnualReportsPage() {
  const { reports, loading, error } = useAnnualReports()

  return (
    <>
      <PageHero
        eyebrow="Resource Centre"
        title="Annual Reports"
        subtitle="CEDA's annual reports and organisational policies."
        image="/assets/hero/publications-hero.webp"
      />

      <section>
        <Container className="py-[var(--section-y)]">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="aspect-[3/4] animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <Card>
              <p className="eyebrow">Unable to load</p>
              <p className="body-md mt-4">Annual reports could not be loaded. Please try again later.</p>
            </Card>
          ) : !reports.length ? (
            <Card>
              <p className="eyebrow">Nothing here yet</p>
              <p className="body-md mt-4">Annual reports will be published here.</p>
            </Card>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {reports.map((report) => {
                const date = formatDate(report)
                const tile = (
                  <>
                    <div className="aspect-[3/4] overflow-hidden border-b border-[var(--color-line)] bg-white">
                      {report.thumbnail_url ? (
                        <img
                          src={report.thumbnail_url}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[var(--color-bg-elevated)]">
                          <FileText className="text-[var(--color-accent)]" size={48} strokeWidth={1.3} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <h2 className="text-base font-medium leading-snug text-[var(--color-text)]">{report.title}</h2>
                      {date ? <p className="text-sm text-[var(--color-text-faint)]">{date}</p> : null}
                      {report.file_url ? (
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">
                          View PDF
                          <ArrowUpRight
                            size={14}
                            aria-hidden="true"
                            className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                          <span className="sr-only">(opens in a new tab)</span>
                        </span>
                      ) : (
                        <span className="mt-auto pt-2 text-sm text-[var(--color-text-faint)]">PDF coming soon</span>
                      )}
                    </div>
                  </>
                )
                const tileClass =
                  'group flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-bg-card)] shadow-[0_18px_44px_rgba(24,49,38,0.08)]'

                return (
                  <li key={report.id || report.slug}>
                    {report.file_url ? (
                      <a
                        href={report.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className={`${tileClass} transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[0_24px_56px_rgba(24,49,38,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]`}
                      >
                        {tile}
                      </a>
                    ) : (
                      <div className={tileClass}>{tile}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </Container>
      </section>
    </>
  )
}
