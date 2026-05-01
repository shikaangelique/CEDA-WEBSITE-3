import { NavLink } from 'react-router-dom'
import { siteContent } from '../../data/siteContent'
import Container from '../ui/Container'

const footerLinkPaths = {
  Home: '/',
  About: '/about',
  'Thematic Areas': '/thematic-areas',
  'Resource Centre': '/resource-centre/publications',
  News: '/news',
  Contact: '/contact',
}

export default function Footer() {
  const { footer } = siteContent

  return (
    <footer className="border-t border-[var(--color-line)] bg-[rgba(17,21,15,0.72)]">
      <Container className="grid gap-12 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:py-16">
        <div>
          <img
            src="/assets/logos/ceda-logo-full-no-edge.png"
            alt={footer.organisation}
            className="h-20 w-auto"
          />
          <address className="mt-8 not-italic text-sm leading-7 text-[var(--color-text-muted)]">
            <span className="block">{footer.address}</span>
            <span className="block">{footer.phone.join(' · ')}</span>
            <a
              className="transition hover:text-[var(--color-accent-bright)]"
              href={`mailto:${footer.email}`}
            >
              {footer.email}
            </a>
          </address>
        </div>

        <div>
          <h2 className="eyebrow mb-5">Quick links</h2>
          <nav className="grid gap-3 text-sm text-[var(--color-text-muted)]">
            {footer.quickLinks.map((label) => (
              <NavLink
                key={label}
                to={footerLinkPaths[label]}
                className="transition hover:text-[var(--color-text)]"
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="eyebrow mb-5">Social</h2>
          <div className="flex flex-wrap gap-3 text-sm text-[var(--color-text-muted)]">
            {footer.social.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-[var(--radius-sm)] border border-[var(--color-line)] px-3 py-2 transition hover:border-[var(--color-line-strong)] hover:text-[var(--color-text)]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
