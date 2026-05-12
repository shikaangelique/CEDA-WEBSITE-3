import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
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

function EngagementLineGraph({ percentages }) {
  const values = assessmentQuestions.map((question) => percentages[question.id] ?? 0)
  const chartPoints = values.map((value, index) => {
    const x = 16.666 + index * 33.333
    const y = Math.max(12, Math.min(78, 78 - value * 0.58))

    return { x, y, value, question: assessmentQuestions[index] }
  })

  return (
    <div className="mt-10 overflow-hidden rounded-[var(--radius-md)] border border-[rgba(136,203,147,0.22)] bg-[linear-gradient(135deg,rgba(232,235,217,0.96),rgba(196,200,179,0.82)_42%,rgba(53,90,60,0.28)_100%)] text-[var(--color-bg)] shadow-[0_24px_90px_rgba(0,0,0,0.24)]">
      <div className="grid gap-6 p-5 md:p-6 lg:grid-cols-[0.58fr_1.42fr] lg:items-stretch">
        <div className="flex flex-col justify-between rounded-[var(--radius-sm)] border border-[rgba(53,90,60,0.16)] bg-[rgba(255,255,255,0.32)] p-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#355a3c]">
              Engagement survey
            </p>
            <h4 className="mt-3 text-2xl font-medium leading-tight md:text-3xl">
              Your alignment across the three questions
            </h4>
          </div>
          <p className="mt-8 text-sm leading-6 text-[#3f4739]">
            The animated line traces the share of visitors who selected the same answer as you
            for each question.
          </p>
        </div>

        <div className="relative flex min-h-[23rem] flex-col overflow-hidden rounded-[var(--radius-sm)] border border-[rgba(53,90,60,0.16)] bg-[radial-gradient(circle_at_18%_18%,rgba(107,181,120,0.26),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.62),rgba(232,235,217,0.2))] p-4 md:p-5">
          <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(53,90,60,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(53,90,60,0.1)_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative h-64 w-full md:h-72">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              {[22, 44, 66].map((line) => (
                <line
                  key={line}
                  x1="4"
                  x2="96"
                  y1={line}
                  y2={line}
                  stroke="rgba(53,90,60,0.16)"
                  strokeWidth="0.45"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              {chartPoints.map((point) => (
                <line
                  key={point.question.id}
                  x1={point.x}
                  x2={point.x}
                  y1="8"
                  y2="88"
                  stroke="rgba(53,90,60,0.1)"
                  strokeWidth="0.35"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              <motion.line
                x1={chartPoints[0].x}
                y1={chartPoints[0].y}
                x2={chartPoints[1].x}
                y2={chartPoints[1].y}
                stroke="#355a3c"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                transition={{ delay: 0.42, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                vectorEffect="non-scaling-stroke"
              />
              <motion.line
                x1={chartPoints[1].x}
                y1={chartPoints[1].y}
                x2={chartPoints[2].x}
                y2={chartPoints[2].y}
                stroke="#355a3c"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                transition={{ delay: 1.58, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {chartPoints.map((point, index) => (
              <motion.span
                key={point.question.id}
                className="absolute z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#88cb93] bg-[#355a3c] shadow-[0_0_0_5px_rgba(107,181,120,0.16)]"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                transition={{
                  delay: [0.08, 1.36, 2.52][index],
                  duration: 0.18,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ))}
          </div>
          <div className="relative mt-auto grid grid-cols-3 gap-px overflow-hidden rounded-[var(--radius-sm)] border border-[rgba(53,90,60,0.16)] bg-[rgba(53,90,60,0.18)]">
            {chartPoints.map((point) => (
              <div key={point.question.id} className="bg-[rgba(232,235,217,0.74)] p-3 text-center md:p-4">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#355a3c] md:text-xs">
                  {point.question.label.replace('.', '')}
                </p>
                <p className="mt-1 text-2xl font-medium text-[#263722] md:text-3xl">{point.value}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
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

        <EngagementLineGraph percentages={results.percentages} />

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
