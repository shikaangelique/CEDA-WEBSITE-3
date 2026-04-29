import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

function getQuestionId(row) {
  return row.question_id || row.question || row.q || row.question_key
}

function getOptionId(row) {
  return row.option_id || row.option || row.answer || row.option_key
}

function getCount(row) {
  return Number(row.response_count ?? 0)
}

function normalizeRows(rows = []) {
  return rows.reduce((acc, row) => {
    const questionId = getQuestionId(row)
    const optionId = getOptionId(row)

    if (!questionId || !optionId || optionId === 'total') return acc

    acc[questionId] ||= {}
    acc[questionId][optionId] = getCount(row)

    return acc
  }, {})
}

function calculatePercentages(counts, answers) {
  return Object.entries(answers).reduce((acc, [questionId, optionId]) => {
    const questionCounts = counts[questionId] || {}
    const selectedCount = Number(questionCounts[optionId] || 0)
    const questionTotal = Object.values(questionCounts).reduce((sum, count) => sum + Number(count || 0), 0)

    acc[questionId] = questionTotal ? Math.round((selectedCount / questionTotal) * 100) : 0

    return acc
  }, {})
}

export function useAssessment() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchCounts() {
    const { data, error: fetchError } = await supabase.from('assessment_responses').select('*')

    if (fetchError) throw fetchError

    return data || []
  }

  async function submit(answers) {
    setLoading(true)
    setError(null)

    try {
      const { data, error: rpcError } = await supabase.rpc('increment_assessment_counters', {
        q1_choice: answers.q1,
        q2_choice: answers.q2,
        q3_choice: answers.q3,
      })

      if (rpcError) throw rpcError

      const rows = Array.isArray(data) && data.length ? data : await fetchCounts()
      const counts = normalizeRows(rows)
      const percentages = calculatePercentages(counts, answers)
      const nextResults = { answers, counts, percentages }

      setResults(nextResults)
      setLoading(false)

      return { ok: true, results: nextResults, error: null }
    } catch (submitError) {
      setError(submitError)
      setLoading(false)

      return { ok: false, results: null, error: submitError }
    }
  }

  function reset() {
    setResults(null)
    setError(null)
    setLoading(false)
  }

  return { submit, reset, results, loading, error }
}
