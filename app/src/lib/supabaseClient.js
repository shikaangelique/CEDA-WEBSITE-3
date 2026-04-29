import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (import.meta.env.DEV) {
  if (!supabaseUrl) {
    console.warn('Missing VITE_SUPABASE_URL. Add it to app/.env.local to enable Supabase.')
  }

  if (!supabaseAnonKey) {
    console.warn('Missing VITE_SUPABASE_ANON_KEY. Add it to app/.env.local to enable Supabase.')
  }
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
)
