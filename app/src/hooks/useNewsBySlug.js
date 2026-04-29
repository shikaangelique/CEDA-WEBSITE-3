import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useNewsBySlug(slug) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchPost() {
      if (!slug) {
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('news_posts')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()

      if (!isMounted) return

      if (fetchError) {
        setError(fetchError)
        setPost(null)
      } else {
        setPost(data)
      }

      setLoading(false)
    }

    fetchPost()

    return () => {
      isMounted = false
    }
  }, [slug])

  return { post, loading, error }
}
