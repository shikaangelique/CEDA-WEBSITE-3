import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Outlet, useLocation } from 'react-router-dom'
import { ConsentProvider } from '../consent/ConsentContext'
import CookieBanner from '../consent/CookieBanner'
import Seo from '../seo/Seo'
import { routeMeta } from '../../data/routeMeta'
import Footer from './Footer'
import Header from './Header'

export default function Layout() {
  const { pathname } = useLocation()
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const meta = routeMeta[normalized]

  return (
    <ConsentProvider>
      <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
        {meta ? (
          <Seo title={meta.title} description={meta.description} path={normalized} noindex={meta.noindex} />
        ) : null}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[var(--radius-sm)] focus:bg-[var(--color-bg-card)] focus:px-4 focus:py-2 focus:text-[var(--color-text)]"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content">
          <Outlet />
        </main>
        <Footer />
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
      </div>
    </ConsentProvider>
  )
}
