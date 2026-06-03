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
  { label: 'News & Media', to: '/news' },
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
  {
    match: '/news',
    items: [
      { label: 'News and Media', to: '/news' },
      { label: 'ACEP Spotlight', to: '/news/project-spotlight/acep' },
      { label: 'CCG Spotlight', to: '/news/project-spotlight/ccg' },
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
          ? 'border-[rgba(246,247,241,0.08)] bg-[rgba(17,21,15,0.9)] shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-xl'
          : 'border-[rgba(246,247,241,0.08)] bg-[rgba(17,21,15,0.82)] backdrop-blur-xl',
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
              className="h-8 w-auto object-contain"
            />
          </span>
          <span className="mt-1 hidden text-[0.65rem] font-light tracking-[0.08em] text-[rgba(246,247,241,0.68)] sm:block">
            Centre for Extractives and Development Africa
          </span>
        </NavLink>

        <nav className="hidden items-center gap-7 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[rgba(246,247,241,0.72)] md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'rounded-full px-3 py-2 transition duration-200 hover:text-white',
                  isActive
                    ? 'bg-[rgba(63,125,100,0.16)] text-white ring-1 ring-[rgba(111,170,142,0.26)]'
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] border border-[rgba(246,247,241,0.12)] text-white transition hover:border-[rgba(246,247,241,0.28)] md:hidden"
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
        <div className="hidden border-t border-[rgba(246,247,241,0.08)] bg-[rgba(17,21,15,0.76)] backdrop-blur-xl md:block">
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
                      ? 'border-[rgba(246,247,241,0.18)] bg-[rgba(246,247,241,0.14)] !text-white'
                      : 'border-[rgba(246,247,241,0.32)] !text-white hover:border-[rgba(246,247,241,0.48)] hover:!text-white',
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
