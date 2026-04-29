import { NavLink } from 'react-router-dom'

export default function MobileMenu({
  isOpen,
  navItems = [],
  activeSubMenu,
  organisation,
  onNavigate,
}) {
  if (!isOpen) return null

  return (
    <div className="border-t border-[var(--color-line)] bg-[rgba(10,12,10,0.96)] backdrop-blur-xl md:hidden">
      <div className="px-[var(--container-x)] py-6">
        <p className="mb-6 max-w-xs text-sm leading-6 text-[var(--color-text-faint)]">{organisation}</p>
        <nav className="flex flex-col">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={onNavigate}
              className={({ isActive }) =>
                [
                  'border-t border-[var(--color-line)] py-4 font-mono text-sm uppercase tracking-[0.12em] transition',
                  isActive
                    ? 'text-[var(--color-accent)]'
                    : 'text-[var(--color-text)] hover:text-[var(--color-accent-bright)]',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        {activeSubMenu ? (
          <div className="mt-6 border-t border-[var(--color-line)] pt-5">
            <p className="eyebrow mb-3">Sub pages</p>
            <div className="grid gap-2">
              {activeSubMenu.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    [
                      'rounded-[var(--radius-sm)] border px-3 py-3 text-sm transition',
                      isActive
                        ? 'border-[rgba(107,181,120,0.5)] bg-[rgba(107,181,120,0.14)] text-[var(--color-accent-bright)]'
                        : 'border-[var(--color-line)] text-[var(--color-text-muted)]',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
