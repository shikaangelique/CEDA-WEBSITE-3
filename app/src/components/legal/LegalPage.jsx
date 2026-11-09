import Container from '../ui/Container'
import Eyebrow from '../ui/Eyebrow'

export default function LegalPage({ eyebrow, title, updated, sections }) {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <Container className="pb-12 pt-32 md:pb-16">
          <Eyebrow withLine>{eyebrow}</Eyebrow>
          <h1 className="heading-xl mt-6 max-w-4xl text-[var(--color-text)]">{title}</h1>
          <p className="mt-6 text-sm text-[var(--color-text-faint)]">Last updated {updated}</p>
        </Container>
      </section>
      <section>
        <Container className="py-[var(--section-y)]">
          <div className="max-w-3xl space-y-12">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-2xl font-medium text-[var(--color-text)]">{section.heading}</h2>
                <div className="body-md mt-4 space-y-4">
                  {section.body.map((item, index) =>
                    Array.isArray(item) ? (
                      <ul key={index} className="list-disc space-y-2 pl-6">
                        {item.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                    ) : (
                      <p key={index}>{item}</p>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
