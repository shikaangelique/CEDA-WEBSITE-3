import { useMemo, useState } from 'react'
import { assessmentContent, assessmentQuestions } from '../../data/assessmentQuestions'
import { useAssessment } from '../../hooks/useAssessment'
import Button from '../ui/Button'
import Card from '../ui/Card'

function getSelectedLabels(answers) {
  return assessmentQuestions.reduce((acc, question) => {
    const selected = question.options.find((option) => option.id === answers[question.id])
    acc[question.id] = selected?.label || ''

    return acc
  }, {})
}

export default function AssessmentWidget() {
  const [answers, setAnswers] = useState({})
  const { submit, reset, results, loading, error } = useAssessment()

  const isComplete = assessmentQuestions.every((question) => answers[question.id])
  const selectedLabels = useMemo(() => getSelectedLabels(results?.answers || answers), [answers, results])

  function selectAnswer(questionId, optionId) {
    setAnswers((current) => ({ ...current, [questionId]: optionId }))
    if (results || error) reset()
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!isComplete || loading) return
    await submit(answers)
  }

  function handleRetry() {
    reset()
  }

  if (results) {
    return (
      <Card className="mt-14">
        <p className="eyebrow">Results</p>
        <h3 className="heading-lg mt-5">{assessmentContent.resultLead}</h3>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {assessmentQuestions.map((question) => (
            <div
              key={question.id}
              className="rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[rgba(255,255,255,0.03)] p-5"
            >
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-faint)]">
                {question.label}
              </p>
              <h4 className="mt-4 text-base font-medium leading-snug text-[var(--color-text)]">
                {question.question}
              </h4>
              <p className="mt-4 text-4xl font-light text-[var(--color-accent-bright)]">
                {results.percentages[question.id] ?? 0}%
              </p>
              <p className="body-md mt-3">
                of visitors picked the same option as you.
              </p>
              <p className="mt-4 border-t border-[var(--color-line)] pt-4 text-sm text-[var(--color-text)]">
                {selectedLabels[question.id]}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[var(--color-line)] pt-8">
          <h4 className="text-2xl font-medium text-[var(--color-text)]">
            {assessmentContent.narrativeTitle}
          </h4>
          <div className="mt-5 grid gap-5">
            {assessmentContent.narrative.map((paragraph) => (
              <p key={paragraph} className="body-md max-w-4xl">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/resource-centre/publications">{assessmentContent.ctas[0]}</Button>
            <Button href="/thematic-areas" variant="secondary">
              {assessmentContent.ctas[1]}
            </Button>
            <Button type="button" variant="ghost" onClick={handleRetry}>
              Retake
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="mt-14">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-5 lg:grid-cols-3">
          {assessmentQuestions.map((question) => (
            <fieldset
              key={question.id}
              className="rounded-[var(--radius-md)] border border-[var(--color-line)] p-5"
            >
              <legend className="eyebrow px-1">{question.label}</legend>
              <h3 className="mt-4 text-lg font-medium text-[var(--color-text)]">{question.question}</h3>
              <div className="mt-6 grid gap-2">
                {question.options.map((option) => {
                  const selected = answers[question.id] === option.id

                  return (
                    <label
                      key={option.id}
                      className={[
                        'flex cursor-pointer gap-3 rounded-[var(--radius-sm)] border px-3 py-3 text-sm transition',
                        selected
                          ? 'border-[rgba(107,181,120,0.55)] bg-[rgba(107,181,120,0.14)] text-[var(--color-text)]'
                          : 'border-[var(--color-line)] text-[var(--color-text-muted)] hover:border-[var(--color-line-strong)] hover:text-[var(--color-text)]',
                      ].join(' ')}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option.id}
                        checked={selected}
                        onChange={() => selectAnswer(question.id, option.id)}
                        className="mt-1 accent-[var(--color-accent)]"
                      />
                      <span>{option.label}</span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
          ))}
        </div>

        {error ? (
          <div className="mt-8 rounded-[var(--radius-sm)] border border-[rgba(196,122,106,0.45)] bg-[rgba(196,122,106,0.08)] p-4">
            <p className="text-sm text-[var(--color-rose)]">
              {error.message || 'The assessment could not be submitted.'}
            </p>
            <Button type="button" variant="ghost" className="mt-3" onClick={handleRetry}>
              Retry
            </Button>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button type="submit" disabled={!isComplete || loading}>
            {loading ? 'Submitting' : 'Submit'}
          </Button>
          {!isComplete ? (
            <p className="text-sm text-[var(--color-text-faint)]">
              Answer all three questions before submitting.
            </p>
          ) : null}
        </div>
      </form>
    </Card>
  )
}
