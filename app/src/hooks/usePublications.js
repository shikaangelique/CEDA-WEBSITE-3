import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

function normalize(value) {
  return String(value || '').toLowerCase().trim()
}

function matchesSearch(publication, search) {
  const query = normalize(search)

  if (!query) return true

  const searchable = [
    publication.title,
    publication.abstract,
    publication.full_text,
    publication.body,
    publication.content,
    Array.isArray(publication.tags) ? publication.tags.join(' ') : publication.tags,
  ]
    .map(normalize)
    .join(' ')

  return searchable.includes(query)
}

export function usePublications(filters = {}) {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const stableFilters = useMemo(
    () => ({
      search: filters.search || '',
      theme: filters.theme || '',
      type: filters.type || '',
      year: filters.year || '',
    }),
    [filters.search, filters.theme, filters.type, filters.year],
  )

  useEffect(() => {
    let isMounted = true

    async function fetchPublications() {
      setLoading(true)
      setError(null)

      let query = supabase.from('publications').select('*')

      if (stableFilters.theme) query = query.eq('theme', stableFilters.theme)
      if (stableFilters.type) query = query.eq('type', stableFilters.type)
      if (stableFilters.year) query = query.eq('year', Number(stableFilters.year))

      query = query
        .order('published_at', { ascending: false, nullsFirst: false })
        .order('year', { ascending: false, nullsFirst: false })

      const { data, error: fetchError } = await query

      if (!isMounted) return

      if (fetchError) {
        setError(fetchError)
        setPublications([])
      } else {
        setPublications((data || []).filter((publication) => matchesSearch(publication, stableFilters.search)))
      }

      setLoading(false)
    }

    fetchPublications()

    return () => {
      isMounted = false
    }
  }, [stableFilters])

  return { publications, loading, error }
}
