import { useEffect, useRef, useState } from 'react'

const MIN_FILL_MS = 3000
const COOLDOWN_MS = 30000

// Lightweight bot filtering for public forms:
// - a honeypot field humans never see (bots fill every input)
// - a minimum time between page load and submit
// - a short cooldown between submissions from the same tab
// Database length/format constraints (supabase/schema/004) are the backstop.
export function useSpamGuard() {
  const [honeypot, setHoneypot] = useState('')
  const startedAt = useRef(0)
  const lastSubmitAt = useRef(0)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  function check() {
    const now = Date.now()
    if (honeypot) return { ok: false, silent: true }
    if (now - startedAt.current < MIN_FILL_MS) return { ok: false, silent: true }
    if (lastSubmitAt.current && now - lastSubmitAt.current < COOLDOWN_MS) {
      return { ok: false, silent: false, message: 'Please wait a moment before sending another message.' }
    }
    lastSubmitAt.current = now
    return { ok: true }
  }

  const honeypotField = (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </label>
    </div>
  )

  return { check, honeypotField }
}
