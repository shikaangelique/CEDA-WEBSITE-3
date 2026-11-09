import { Link } from 'react-router-dom'
import { useConsent } from './ConsentContext'

export default function CookieBanner() {
  const { consent, setConsent } = useConsent()

  if (consent) return null

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-line-strong)] bg-[var(--color-bg-card)] shadow-[0_-12px_40px_rgba(24,49,38,0.12)]"
    >
      <div className="mx-auto flex max-w-[var(--site-max)] flex-col gap-4 px-[var(--container-x)] py-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-3xl text-sm leading-6 text-[var(--color-text-muted)]">
          We use privacy-friendly analytics without cookies. Embedded Google Maps and YouTube
          videos on this site may set their own cookies. Read our{' '}
          <Link to="/privacy" className="underline underline-offset-2 hover:text-[var(--color-accent)]">
            privacy policy
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={() => setConsent('accepted')}
          className="min-h-11 shrink-0 rounded-[var(--radius-sm)] border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 text-sm text-[var(--color-accent-contrast)] transition hover:bg-[var(--color-accent-dim)]"
        >
          OK
        </button>
      </div>
    </div>
  )
}
