import ContactForm from '../components/contact/ContactForm'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import { siteContent } from '../data/siteContent'

export default function ContactPage() {
  const { contact } = siteContent

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We'd like to hear from you."
        subtitle={contact.intro}
        image="/assets/hero/contact-hero.jpeg"
      />

      <section className="border-b border-[var(--color-line)]">
        <Container className="grid gap-10 py-[var(--section-y)] lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader title="Contact details" />
            <div className="mt-10 grid gap-5">
              <Card>
                <p className="eyebrow">Address</p>
                <p className="body-md mt-4">{contact.address}</p>
              </Card>
              <Card>
                <p className="eyebrow">Phone</p>
                <div className="mt-4 grid gap-2 text-[var(--color-text)]">
                  {contact.phone.map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`}>
                      {phone}
                    </a>
                  ))}
                </div>
              </Card>
              <Card>
                <p className="eyebrow">Email</p>
                <a
                  className="mt-4 inline-block text-[var(--color-text)] transition hover:text-[var(--color-accent-bright)]"
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </a>
              </Card>
              <Card>
                <p className="eyebrow">Hours</p>
                <p className="body-md mt-4">{contact.hours}</p>
              </Card>
              <Card>
                <p className="eyebrow">Social</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {contact.social.map((item) => (
                    <a
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-[var(--radius-sm)] border border-[var(--color-line)] px-3 py-2 text-sm text-[var(--color-text-muted)] transition hover:border-[var(--color-line-strong)] hover:text-[var(--color-text)]"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <div>
            <SectionHeader title="Send a message" />
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-[var(--section-y)]">
          <SectionHeader title="Visit us" intro={contact.visitUs} />
          <div className="mt-10 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-bg-card)]">
            <iframe
              title="CEDA office location"
              src={contact.mapEmbedUrl}
              className="h-[28rem] w-full border-0 grayscale-[0.25] invert-[0.88] hue-rotate-90 saturate-[0.65]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-line)] bg-[rgba(10,12,10,0.84)] p-5">
              <p className="body-md">{contact.address}</p>
              <a
                href={contact.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)] transition hover:text-[var(--color-accent-bright)]"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
