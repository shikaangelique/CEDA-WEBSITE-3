import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useNews(limit) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchNews() {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('news_posts')
        .select('*')
        .order('published_at', { ascending: false, nullsFirst: false })

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error: fetchError } = await query

      if (!isMounted) return

      if (fetchError) {
        setError(fetchError)
        setPosts([])
      } else {
        setPosts(data || [])
      }

      setLoading(false)
    }

    fetchNews()

    return () => {
      isMounted = false
    }
  }, [limit])

  return { posts, loading, error }
}
