import { createContext, useCallback, useContext, useMemo, useState } from 'react'

// Remembers that the visitor dismissed the cookie notice. Embeds (Google
// Maps, YouTube) always load; analytics is cookieless Vercel Web Analytics.
// Values: 'accepted' (notice dismissed) | null (not dismissed yet).
const STORAGE_KEY = 'ceda-cookie-consent-v1'

function readStored() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === 'accepted' ? value : null
  } catch {
    return null
  }
}

const ConsentContext = createContext(null)

export function ConsentProvider({ children }) {
  const [consent, setConsentState] = useState(readStored)

  const setConsent = useCallback((value) => {
    setConsentState(value)
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // Storage blocked: the choice still applies for this visit.
    }
  }, [])

  const value = useMemo(
    () => ({ consent, setConsent }),
    [consent, setConsent],
  )

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useConsent() {
  const context = useContext(ConsentContext)
  if (!context) throw new Error('useConsent must be used inside ConsentProvider')
  return context
}
