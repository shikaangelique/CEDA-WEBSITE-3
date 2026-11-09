// Writes public/sitemap.xml before each build (npm "prebuild").
// Static routes come from src/data; publications and news slugs come from
// Supabase using the public anon key. If Supabase is unreachable the build
// still succeeds with static routes only.
import { readFile, writeFile } from 'node:fs/promises'
import { routeMeta } from '../src/data/routeMeta.js'
import { thematicAreas } from '../src/data/thematicAreas.js'
import { projectSpotlights } from '../src/data/projectSpotlights.js'
import { ANNUAL_REPORT_TYPES } from '../src/lib/publicationTypes.js'

const SITE = 'https://www.cedaghana.org'

async function loadEnv() {
  if (process.env.VITE_SUPABASE_URL) return
  try {
    const text = await readFile('.env.local', 'utf8')
    for (const line of text.split('\n')) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (match) process.env[match[1]] ??= match[2].replace(/^["']|["']$/g, '')
    }
  } catch {
    // No local env file (e.g. CI): rely on real environment variables.
  }
}

async function fetchRows(table, columns) {
  const url = process.env.VITE_SUPABASE_URL
  const key = process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) return []
  try {
    const response = await fetch(`${url}/rest/v1/${table}?select=${columns}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) throw new Error(`${response.status}`)
    return await response.json()
  } catch (error) {
    console.warn(`sitemap: could not load ${table} (${error.message}); continuing without it`)
    return []
  }
}

await loadEnv()

const entries = Object.entries(routeMeta)
  .filter(([, meta]) => !meta.noindex)
  .map(([path]) => ({ path }))

for (const area of thematicAreas) entries.push({ path: `/thematic-areas/${area.slug}` })
for (const project of projectSpotlights) entries.push({ path: `/news/project-spotlight/${project.slug}` })

// Annual Reports-tab documents open as PDFs and have no page of their own.
const annualTypes = ANNUAL_REPORT_TYPES.map((type) => type.toLowerCase())
const publications = (await fetchRows('publications', 'slug,id,type,updated_at')).filter(
  (row) => !annualTypes.includes(String(row.type || '').toLowerCase()),
)
for (const row of publications) {
  entries.push({ path: `/resource-centre/publications/${row.slug || row.id}`, lastmod: row.updated_at })
}
const news = await fetchRows('news_posts', 'slug,updated_at')
for (const row of news) {
  if (row.slug) entries.push({ path: `/news/${row.slug}`, lastmod: row.updated_at })
}

const unique = [...new Map(entries.map((entry) => [entry.path, entry])).values()]
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${unique
  .map(({ path, lastmod }) => {
    const date = lastmod ? `<lastmod>${new Date(lastmod).toISOString().slice(0, 10)}</lastmod>` : ''
    return `  <url><loc>${SITE}${path === '/' ? '/' : path}</loc>${date}</url>`
  })
  .join('\n')}
</urlset>
`

await writeFile('public/sitemap.xml', xml)
console.log(`sitemap: wrote ${unique.length} URLs to public/sitemap.xml`)
