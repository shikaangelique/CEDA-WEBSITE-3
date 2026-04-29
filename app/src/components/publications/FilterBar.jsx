const emptyOption = 'All'

function SelectFilter({ label, value, options, onChange }) {
  return (
    <label className="grid gap-2">
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--color-text-faint)]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-[var(--color-bg-soft)] px-3 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-accent)]"
      >
        <option value="">{emptyOption}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function FilterBar({ filters, options, onChange, onReset }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[rgba(17,21,15,0.72)] p-4">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.6fr_auto] lg:items-end">
        <label className="grid gap-2">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--color-text-faint)]">
            Search
          </span>
          <input
            value={filters.search}
            onChange={(event) => onChange({ search: event.target.value })}
            placeholder="Search title, abstract, or tags"
            className="min-h-11 rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-[var(--color-bg-soft)] px-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-accent)]"
          />
        </label>

        <SelectFilter
          label="Theme"
          value={filters.theme}
          options={options.themes}
          onChange={(theme) => onChange({ theme })}
        />
        <SelectFilter
          label="Type"
          value={filters.type}
          options={options.types}
          onChange={(type) => onChange({ type })}
        />
        <SelectFilter
          label="Year"
          value={filters.year}
          options={options.years}
          onChange={(year) => onChange({ year })}
        />

        <button
          type="button"
          onClick={onReset}
          className="min-h-11 rounded-[var(--radius-sm)] border border-[var(--color-line)] px-4 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-muted)] transition hover:border-[var(--color-line-strong)] hover:text-[var(--color-text)]"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
