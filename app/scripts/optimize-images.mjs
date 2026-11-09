// Converts every JPG/PNG under public/assets to a resized WebP, rewrites
// references in src/ and index.html, and moves the originals to
// ../source-assets/raw/site-originals (gitignored) so nothing is lost.
//
// Run from app/:  node scripts/optimize-images.mjs
import { readdir, readFile, writeFile, mkdir, rename, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const PUBLIC = path.resolve('public')
const ASSETS = path.join(PUBLIC, 'assets')
const BACKUP = path.resolve('../source-assets/raw/site-originals')

// Max width per top-level folder; photos never need more than ~2000px.
const MAX_WIDTH = { hero: 2000, thematic: 2000, images: 2000, 'project-spotlights': 1600,
  board: 900, team: 900, partners: 600, logos: 800, 'publication-thumbnails': 900,
  'ppp-structural-diagrams': 1400 }

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else if (/\.(jpe?g|png)$/i.test(entry.name)) out.push(full)
  }
  return out
}

async function readSources(dir) {
  let text = ''
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) text += await readSources(full)
    else if (/\.(jsx?|css|html)$/.test(entry.name)) text += await readFile(full, 'utf8')
  }
  return text
}
const sourceText = (await readSources(path.resolve('src'))) + (await readFile('index.html', 'utf8'))

const files = await walk(ASSETS)
let before = 0
let after = 0
let unused = 0
const renames = []

for (const file of files) {
  const rel = path.relative(PUBLIC, file)
  const folder = rel.split(path.sep)[1]
  const backup = path.join(BACKUP, rel)
  const webPath = '/' + rel.split(path.sep).join('/')

  // Images nothing references are moved out of the deploy, not converted.
  if (!sourceText.includes(webPath)) {
    await mkdir(path.dirname(backup), { recursive: true })
    await rename(file, backup)
    unused += (await stat(backup)).size
    console.log(`  unused -> backup  ${rel}`)
    continue
  }

  const target = file.replace(/\.(jpe?g|png)$/i, '.webp')
  const meta = await sharp(file).metadata()
  const width = Math.min(meta.width, MAX_WIDTH[folder] ?? 1600)
  const isGraphic = ['partners', 'logos', 'ppp-structural-diagrams'].includes(folder)

  await sharp(file)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp(isGraphic ? { quality: 90, alphaQuality: 100 } : { quality: 72, effort: 6 })
    .toFile(target + '.tmp')

  await mkdir(path.dirname(backup), { recursive: true })
  await rename(file, backup)
  await rename(target + '.tmp', target)

  const oldSize = (await stat(backup)).size
  const newSize = (await stat(target)).size
  before += oldSize
  after += newSize
  renames.push(['/' + rel.split(path.sep).join('/'), '/' + path.relative(PUBLIC, target).split(path.sep).join('/')])
  console.log(`${(oldSize / 1024).toFixed(0).padStart(7)}KB -> ${(newSize / 1024).toFixed(0).padStart(5)}KB  ${rel}`)
}

// Rewrite references in source files.
async function rewrite(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) await rewrite(full)
    else if (/\.(jsx?|css|html)$/.test(entry.name)) {
      let text = await readFile(full, 'utf8')
      let changed = false
      for (const [from, to] of renames) {
        if (text.includes(from)) {
          text = text.split(from).join(to)
          changed = true
        }
      }
      if (changed) await writeFile(full, text)
    }
  }
}
await rewrite(path.resolve('src'))

console.log(`\nUnused originals moved out: ${(unused / 1048576).toFixed(1)}MB`)
console.log(`Total: ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`)
