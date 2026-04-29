import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useFeaturedPublications(limit = 4) {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchFeatured() {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('publications')
        .select('*')
        .eq('featured', true)
        .order('published_at', { ascending: false, nullsFirst: false })
        .order('year', { ascending: false, nullsFirst: false })
        .limit(limit)

      if (!isMounted) return

      if (fetchError) {
        setError(fetchError)
        setFeatured([])
      } else {
        setFeatured(data || [])
      }

      setLoading(false)
    }

    fetchFeatured()

    return () => {
      isMounted = false
    }
  }, [limit])

  return { featured, loading, error }
}
