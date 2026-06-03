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
    <footer className="border-t border-[rgba(246,247,241,0.08)] bg-[rgba(17,21,15,0.94)]">
      <Container className="grid gap-12 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:py-16">
        <div>
          <img
            src="/assets/logos/ceda-logo-no-text-white-green.png"
            alt={footer.organisation}
            className="h-14 w-auto"
          />
          <address className="mt-8 not-italic text-sm leading-7 text-[rgba(246,247,241,0.7)]">
            <span className="block">{footer.address}</span>
            <span className="block">{footer.phone.join(' · ')}</span>
            <a
              className="transition hover:text-white"
              href={`mailto:${footer.email}`}
            >
              {footer.email}
            </a>
          </address>
        </div>

        <div>
          <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent-bright)]">Quick links</h2>
          <nav className="grid gap-3 text-sm text-[rgba(246,247,241,0.7)]">
            {footer.quickLinks.map((label) => (
              <NavLink
                key={label}
                to={footerLinkPaths[label]}
                className="transition hover:text-white"
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent-bright)]">Social</h2>
          <div className="flex flex-wrap gap-3 text-sm text-[rgba(246,247,241,0.7)]">
            {footer.social.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-[var(--radius-sm)] border border-[rgba(246,247,241,0.12)] px-3 py-2 transition hover:border-[rgba(246,247,241,0.28)] hover:text-white"
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
