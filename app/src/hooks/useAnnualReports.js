import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { onlyAnnualReportTypes } from '../lib/publicationTypes'

export function useAnnualReports() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchReports() {
      const { data, error: fetchError } = await onlyAnnualReportTypes(
        supabase.from('publications').select('id,slug,title,type,year,month,file_url,thumbnail_url,published_at'),
      )
        .order('published_at', { ascending: false, nullsFirst: false })
        .order('year', { ascending: false, nullsFirst: false })

      if (!isMounted) return

      if (fetchError) {
        setError(fetchError)
        setReports([])
      } else {
        setReports(data || [])
      }
      setLoading(false)
    }

    fetchReports()

    return () => {
      isMounted = false
    }
  }, [])

  return { reports, loading, error }
}
