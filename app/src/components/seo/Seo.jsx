// Per-page metadata using React 19's built-in hoisting of <title>/<meta>/<link>
// into <head>. index.html holds the defaults that link-preview bots see.
export const SITE_URL = 'https://www.cedaghana.org'
export const SITE_NAME = 'CEDA – Centre for Extractives and Development Africa'
export const DEFAULT_DESCRIPTION =
  'CEDA is a research and advocacy organisation working for better governance of Africa’s mineral and petroleum resources, so they deliver real improvements for the people who depend on them.'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

function clip(text, max = 160) {
  if (!text) return text
  const clean = String(text).replace(/\s+/g, ' ').trim()
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean
}

export default function Seo({ title, description = DEFAULT_DESCRIPTION, path, image, noindex = false }) {
  const fullTitle = title ? `${title} | CEDA` : SITE_NAME
  const desc = clip(description)
  const url = path != null ? `${SITE_URL}${path}` : null
  const img = image ? (image.startsWith('/') ? `${SITE_URL}${image}` : image) : DEFAULT_IMAGE

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {url ? <link rel="canonical" href={url} /> : null}
      {noindex ? <meta name="robots" content="noindex" /> : null}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />
      {url ? <meta property="og:url" content={url} /> : null}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
    </>
  )
}
