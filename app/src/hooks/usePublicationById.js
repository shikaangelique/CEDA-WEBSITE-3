import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  )
}

export function usePublicationById(idOrSlug) {
  const [publication, setPublication] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchPublication() {
      if (!idOrSlug) {
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      const lookupColumn = isUuid(idOrSlug) ? 'id' : 'slug'

      const { data, error: fetchError } = await supabase
        .from('publications')
        .select('*')
        .eq(lookupColumn, idOrSlug)
        .maybeSingle()

      if (!isMounted) return

      if (fetchError) {
        setError(fetchError)
        setPublication(null)
        setRelated([])
        setLoading(false)
        return
      }

      setPublication(data)

      if (!data) {
        setRelated([])
        setLoading(false)
        return
      }

      let relatedQuery = supabase
        .from('publications')
        .select('*')
        .neq('id', data.id)
        .order('published_at', { ascending: false, nullsFirst: false })
        .order('year', { ascending: false, nullsFirst: false })
        .limit(3)

      if (data.theme) {
        relatedQuery = relatedQuery.eq('theme', data.theme)
      }

      const { data: relatedData, error: relatedError } = await relatedQuery

      if (!isMounted) return

      if (relatedError) {
        setRelated([])
      } else {
        setRelated(relatedData || [])
      }

      setLoading(false)
    }

    fetchPublication()

    return () => {
      isMounted = false
    }
  }, [idOrSlug])

  return { publication, related, loading, error }
}
