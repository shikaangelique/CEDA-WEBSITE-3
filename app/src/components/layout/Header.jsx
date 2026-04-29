import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { siteContent } from '../../data/siteContent'
import Container from '../ui/Container'
import MobileMenu from './MobileMenu'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Thematic Areas', to: '/thematic-areas' },
  { label: 'Resource Centre', to: '/resource-centre/publications' },
  { label: 'News', to: '/news' },
  { label: 'Contact', to: '/contact' },
]

const subMenus = [
  {
    match: '/about',
    items: [
      { label: 'Overview', to: '/about' },
      { label: 'Board and Team', to: '/about/team' },
    ],
  },
  {
    match: '/thematic-areas',
    items: [
      { label: 'Overview', to: '/thematic-areas' },
      { label: 'Youth Development', to: '/thematic-areas/youth-development' },
      { label: 'Corporate Accountability', to: '/thematic-areas/corporate-accountability' },
      { label: 'Climate and Energy', to: '/thematic-areas/climate-energy-transition' },
      { label: 'Gender and Inclusion', to: '/thematic-areas/gender-equity-inclusion' },
    ],
  },
  {
    match: '/resource-centre',
    items: [
      { label: 'Publications', to: '/resource-centre/publications' },
      { label: 'Press Statements', to: '/resource-centre/press-statements' },
      { label: 'Annual Reports', to: '/resource-centre/annual-reports' },
    ],
  },
]

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const activeSubMenu = subMenus.find((menu) => pathname.startsWith(menu.match))

  useEffect(() => {
    function handleScroll() {
      setHasScrolled(window.scrollY > 12)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen])

  return (
    <header
      className={[
        'sticky top-0 z-50 border-b transition duration-300 ease-[var(--ease-out)]',
        hasScrolled || isMenuOpen
          ? 'border-[var(--color-line)] bg-[rgba(10,12,10,0.86)] shadow-[0_1px_0_rgba(255,255,255,0.02)] backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      ].join(' ')}
    >
      <Container className="flex items-center justify-between py-4 md:py-5">
        <NavLink
          to="/"
          className="flex flex-col leading-none"
          onClick={() => setIsMenuOpen(false)}
          aria-label="CEDA home"
        >
          <span className="inline-flex w-fit">
            <img
              src="/assets/logos/ceda-logo-no-text-white-green.png"
              alt="CEDA"
              className="h-7 w-auto object-contain"
            />
          </span>
          <span className="mt-1 hidden text-[0.65rem] font-light tracking-[0.08em] text-[var(--color-text-faint)] sm:block">
            Centre for Extractives and Development Africa
          </span>
        </NavLink>

        <nav className="hidden items-center gap-7 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[var(--color-text-muted)] md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'rounded-full px-3 py-2 transition duration-200 hover:text-[var(--color-text)]',
                  isActive
                    ? 'bg-[rgba(107,181,120,0.12)] text-[var(--color-accent-bright)] ring-1 ring-[rgba(107,181,120,0.24)]'
                    : '',
                ].join(' ')
              }
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-line)] text-[var(--color-text)] transition hover:border-[var(--color-line-strong)] md:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </Container>

      <MobileMenu
        isOpen={isMenuOpen}
        navItems={navItems}
        subMenus={subMenus}
        activeSubMenu={activeSubMenu}
        organisation={siteContent.footer.organisation}
        onNavigate={() => setIsMenuOpen(false)}
      />

      {activeSubMenu ? (
        <div className="hidden border-t border-[var(--color-line)] bg-[rgba(10,12,10,0.72)] backdrop-blur-xl md:block">
          <Container className="flex gap-3 overflow-x-auto py-3">
            {activeSubMenu.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  [
                    'shrink-0 rounded-full border px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] transition',
                    isActive
                      ? 'border-[rgba(107,181,120,0.5)] bg-[rgba(107,181,120,0.14)] text-[var(--color-accent-bright)]'
                      : 'border-[var(--color-line)] text-[var(--color-text-faint)] hover:text-[var(--color-text)]',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  )
}
