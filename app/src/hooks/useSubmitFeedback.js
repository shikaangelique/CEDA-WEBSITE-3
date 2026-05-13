import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useSubmitFeedback() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  async function submit(payload) {
    setStatus('sending')
    setError(null)

    const { error: insertError } = await supabase.from('site_feedback').insert({
      name: payload.name || null,
      role: payload.role || null,
      load_time_rating: payload.load_time_rating || null,
      visual_design_rating: payload.visual_design_rating || null,
      ease_of_use_rating: payload.ease_of_use_rating || null,
      navigation_rating: payload.navigation_rating || null,
      mobile_experience_rating: payload.mobile_experience_rating || null,
      publication_access_rating: payload.publication_access_rating || null,
      liked_most: payload.liked_most || null,
      confusing_or_broken: payload.confusing_or_broken || null,
      suggested_improvements: payload.suggested_improvements || null,
      overall_rating: payload.overall_rating,
    })

    if (insertError) {
      setError(insertError)
      setStatus('error')
      return { ok: false, error: insertError }
    }

    setStatus('success')
    return { ok: true, error: null }
  }

  function reset() {
    setStatus('idle')
    setError(null)
  }

  return { submit, reset, status, error }
}
