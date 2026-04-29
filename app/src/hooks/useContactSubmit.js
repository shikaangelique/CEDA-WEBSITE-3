import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useContactSubmit() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  async function submit(payload) {
    setStatus('sending')
    setError(null)

    const { error: insertError } = await supabase.from('contact_submissions').insert({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || null,
      organisation: payload.organisation || null,
      message: payload.message,
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
