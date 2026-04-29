import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'

const AboutPage = lazy(() => import('../pages/AboutPage'))
const AnnualReportsPage = lazy(() => import('../pages/AnnualReportsPage'))
const ContactPage = lazy(() => import('../pages/ContactPage'))
const LandingPage = lazy(() => import('../pages/LandingPage'))
const NewsDetailPage = lazy(() => import('../pages/NewsDetailPage'))
const NewsPage = lazy(() => import('../pages/NewsPage'))
const PressStatementsPage = lazy(() => import('../pages/PressStatementsPage'))
const PublicationDetailPage = lazy(() => import('../pages/PublicationDetailPage'))
const PublicationsPage = lazy(() => import('../pages/PublicationsPage'))
const StrategyPage = lazy(() => import('../pages/StrategyPage'))
const TeamPage = lazy(() => import('../pages/TeamPage'))
const ThematicAreaDetail = lazy(() => import('../pages/ThematicAreaDetail'))
const ThematicAreasPage = lazy(() => import('../pages/ThematicAreasPage'))

function RouteFallback() {
  return (
    <div className="min-h-[55vh] px-[var(--container-x)] pt-40">
      <div className="mx-auto flex max-w-[var(--site-max)] items-center gap-3 text-sm uppercase tracking-[0.18em] text-[var(--color-text-faint)]">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-accent)]" />
        Loading
      </div>
    </div>
  )
}

function lazyElement(Page) {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Page />
    </Suspense>
  )
}

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: lazyElement(LandingPage) },
      { path: 'about', element: lazyElement(AboutPage) },
      { path: 'about/team', element: lazyElement(TeamPage) },
      { path: 'thematic-areas', element: lazyElement(ThematicAreasPage) },
      {
        path: 'thematic-areas/climate-energy-transition/strategy',
        element: lazyElement(StrategyPage),
      },
      { path: 'thematic-areas/:slug', element: lazyElement(ThematicAreaDetail) },
      { path: 'resource-centre', element: <Navigate to="/resource-centre/publications" replace /> },
      { path: 'resource-centre/publications', element: lazyElement(PublicationsPage) },
      { path: 'resource-centre/publications/:id', element: lazyElement(PublicationDetailPage) },
      { path: 'resource-centre/press-statements', element: lazyElement(PressStatementsPage) },
      { path: 'resource-centre/annual-reports', element: lazyElement(AnnualReportsPage) },
      { path: 'news', element: lazyElement(NewsPage) },
      { path: 'news/:slug', element: lazyElement(NewsDetailPage) },
      { path: 'contact', element: lazyElement(ContactPage) },
    ],
  },
]
