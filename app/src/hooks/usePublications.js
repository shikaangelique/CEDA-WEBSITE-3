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

function escapeSearchTerm(value) {
  return String(value || '').replace(/[%,]/g, '').trim()
}

export function usePublications(filters = {}) {
  const pageSize = filters.pageSize || 9
  const [publications, setPublications] = useState([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
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
    setPage(0)
  }, [stableFilters])

  useEffect(() => {
    let isMounted = true

    async function fetchPublications() {
      if (page === 0) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }
      setError(null)

      let query = supabase.from('publications').select('*')

      if (stableFilters.theme) query = query.eq('theme', stableFilters.theme)
      if (stableFilters.type) query = query.eq('type', stableFilters.type)
      if (stableFilters.year) query = query.eq('year', Number(stableFilters.year))
      if (stableFilters.search) {
        const searchTerm = escapeSearchTerm(stableFilters.search)
        if (searchTerm) query = query.or(`title.ilike.%${searchTerm}%,abstract.ilike.%${searchTerm}%`)
      }

      query = query
        .order('published_at', { ascending: false, nullsFirst: false })
        .order('year', { ascending: false, nullsFirst: false })
        .range(page * pageSize, page * pageSize + pageSize)

      const { data, error: fetchError } = await query

      if (!isMounted) return

      if (fetchError) {
        setError(fetchError)
        if (page === 0) setPublications([])
        setHasMore(false)
      } else {
        const pageData = (data || []).slice(0, pageSize)
        const filtered = pageData.filter((publication) => matchesSearch(publication, stableFilters.search))
        setHasMore((data || []).length > pageSize)
        setPublications((current) => (page === 0 ? filtered : [...current, ...filtered]))
      }

      setLoading(false)
      setLoadingMore(false)
    }

    fetchPublications()

    return () => {
      isMounted = false
    }
  }, [page, pageSize, stableFilters])

  function loadMore() {
    if (!loading && !loadingMore && hasMore) setPage((current) => current + 1)
  }

  return { publications, loading, loadingMore, error, hasMore, loadMore }
}
