import clsx from 'clsx'

export default function PartnerWall({ partners = [], className = '' }) {
  return (
    <div
      className={clsx(
        'grid grid-cols-2 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] sm:grid-cols-3 lg:grid-cols-4',
        className,
      )}
    >
      {partners.map((partner) => (
        <div
          key={partner.name}
          className="group flex min-h-28 items-center justify-center border-b border-r border-[var(--color-line)] bg-[rgba(24,29,22,0.45)] px-5 text-center font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-muted)] transition hover:bg-[var(--color-bg-card)] hover:text-[var(--color-accent-bright)]"
        >
          {partner.logo ? (
            <img
              src={partner.logo}
              alt={partner.name}
              className={clsx(
                'object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0',
                partner.compact && 'max-h-12 max-w-[8.5rem]',
                partner.featuredScale && 'max-h-[5.6rem] max-w-[14.7rem]',
                !partner.compact && !partner.featuredScale && 'max-h-16 max-w-[10.5rem]',
              )}
              loading="lazy"
            />
          ) : (
            partner.name
          )}
        </div>
      ))}
    </div>
  )
}
