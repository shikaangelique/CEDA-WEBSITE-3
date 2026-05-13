import { useMemo, useState } from 'react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import PageHero from '../components/ui/PageHero'
import { useSubmitFeedback } from '../hooks/useSubmitFeedback'

const ratingFields = [
  { key: 'load_time_rating', label: 'Load time' },
  { key: 'visual_design_rating', label: 'Visual design' },
  { key: 'ease_of_use_rating', label: 'Ease of use' },
  { key: 'navigation_rating', label: 'Navigation' },
  { key: 'mobile_experience_rating', label: 'Mobile experience' },
  { key: 'publication_access_rating', label: 'Publication access' },
]

const ratingOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
]

const initialForm = {
  name: '',
  role: '',
  load_time_rating: null,
  visual_design_rating: null,
  ease_of_use_rating: null,
  navigation_rating: null,
  mobile_experience_rating: null,
  publication_access_rating: null,
  liked_most: '',
  confusing_or_broken: '',
  suggested_improvements: '',
  overall_rating: null,
}

function RatingPills({ label, name, value, onChange, required = false }) {
  return (
    <fieldset className="rounded-[var(--radius-md)] border border-[var(--color-line)] p-4">
      <legend className="px-1 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-faint)]">
        {label}
        {required ? <span className="text-[var(--color-accent)]"> *</span> : null}
      </legend>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {ratingOptions.map((option) => {
          const selected = value === option.value

          return (
            <label
              key={option.value}
              className={[
                'flex min-h-11 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] border font-mono text-xs transition',
                selected
                  ? 'border-[rgba(107,181,120,0.65)] bg-[rgba(107,181,120,0.18)] text-[var(--color-text)]'
                  : 'border-[var(--color-line)] text-[var(--color-text-muted)] hover:border-[var(--color-line-strong)] hover:text-[var(--color-text)]',
              ].join(' ')}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(name, option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function FeedbackPage() {
  const [form, setForm] = useState(initialForm)
  const [validationError, setValidationError] = useState('')
  const { submit, status, error } = useSubmitFeedback()

  const completedDetailRatingCount = useMemo(
    () => ratingFields.filter((field) => form[field.key]).length,
    [form],
  )

  const hasWrittenFeedback = [
    form.liked_most,
    form.confusing_or_broken,
    form.suggested_improvements,
  ].some((value) => value.trim().length > 0)

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setValidationError('')
  }

  function updateRating(name, value) {
    setForm((current) => ({ ...current, [name]: value }))
    setValidationError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!form.overall_rating) {
      setValidationError('Please provide an overall rating.')
      return
    }

    if (!hasWrittenFeedback && completedDetailRatingCount < 3) {
      setValidationError('Please complete at least three ratings or add one written comment.')
      return
    }

    const result = await submit(form)
    if (result.ok) setForm(initialForm)
  }

  if (status === 'success') {
    return (
      <>
        <PageHero
          eyebrow="Site review"
          title="Review CEDA site 2026"
          subtitle="Thank you. Your feedback has been received."
        />
        <section>
          <Container className="py-[var(--section-y)]">
            <Card>
              <p className="eyebrow">Feedback received</p>
              <h2 className="heading-lg mt-5">Thank you. Your feedback has been received.</h2>
            </Card>
          </Container>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHero
        eyebrow="Site review"
        title="Review CEDA site 2026"
        subtitle="A feedback form for the CEDA website rebuild."
      />

      <section>
        <Container className="py-[var(--section-y)]">
          <Card>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-faint)]">
                    Name optional
                  </span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    className="min-h-12 rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-[var(--color-bg-soft)] px-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-accent)]"
                    placeholder="Your name"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-faint)]">
                    Role optional
                  </span>
                  <input
                    name="role"
                    value={form.role}
                    onChange={updateField}
                    className="min-h-12 rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-[var(--color-bg-soft)] px-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-accent)]"
                    placeholder="Partner, staff, reviewer, community member..."
                  />
                </label>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-line)] pt-6">
                <p className="eyebrow">Ratings</p>
                <p className="text-sm text-[var(--color-text-faint)]">1 = Poor, 5 = Excellent</p>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {ratingFields.map((field) => (
                  <RatingPills
                    key={field.key}
                    label={field.label}
                    name={field.key}
                    value={form[field.key]}
                    onChange={updateRating}
                  />
                ))}
              </div>

              <div className="mt-8 max-w-xl">
                <RatingPills
                  label="Overall rating"
                  name="overall_rating"
                  value={form.overall_rating}
                  onChange={updateRating}
                  required
                />
              </div>

              <div className="mt-8 grid gap-5">
                {[
                  ['liked_most', 'What did you like most?'],
                  ['confusing_or_broken', 'What felt confusing or broken?'],
                  ['suggested_improvements', 'Suggested improvements'],
                ].map(([name, label]) => (
                  <label key={name} className="grid gap-2">
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-faint)]">
                      {label}
                    </span>
                    <textarea
                      name={name}
                      value={form[name]}
                      onChange={updateField}
                      rows="4"
                      className="rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-[var(--color-bg-soft)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-accent)]"
                    />
                  </label>
                ))}
              </div>

              {validationError || error ? (
                <div className="mt-8 rounded-[var(--radius-sm)] border border-[rgba(196,122,106,0.45)] bg-[rgba(196,122,106,0.08)] p-4">
                  <p className="text-sm text-[var(--color-rose)]">
                    {validationError || error.message || 'Feedback could not be submitted.'}
                  </p>
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Submitting' : 'Submit feedback'}
                </Button>
                <p className="text-sm text-[var(--color-text-faint)]">
                  Login is not required.
                </p>
              </div>
            </form>
          </Card>
        </Container>
      </section>
    </>
  )
}
