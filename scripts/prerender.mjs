/**
 * Post-build prerender: serves dist/ with vite preview, renders every route
 * in headless Chromium, and writes the resulting HTML back into dist/ so
 * crawlers (and link previews) see full content without executing JS.
 * Also emits dist/sitemap.xml with hreflang alternates.
 *
 * Fail-soft: if the browser can't launch (e.g. a CI image without Chromium),
 * the build still succeeds — the site ships as a plain SPA and sitemap.xml
 * is written regardless (it needs no browser).
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { execFileSync } from 'node:child_process'

const SITE_URL = 'https://www.pixelholic.co'
const PORT = 4173

const clientIds = ['kingcart', 'polaris', 'cmei', 'yunyang', 'woolbuddy', 'letape']
const zhRoutes = ['/', '/clients', ...clientIds.map((id) => `/clients/${id}`)]
const routes = [...zhRoutes, ...zhRoutes.map((r) => (r === '/' ? '/en' : `/en${r}`))]

/* ── <lastmod>: when each route's own sources last changed in git ──
   Beats stamping "now" on every URL: a deploy that only touches one case
   page shouldn't tell crawlers the whole site was rewritten.

   When git can't answer (shallow clone, tarball deploy) we omit <lastmod>
   rather than substitute the build date. A wrong lastmod is worse than none
   — crawlers that catch us claiming every page changed on every deploy stop
   trusting the signal site-wide, whereas a missing one just falls back to
   their own judgement. The warning below surfaces it in the build log. */

// Only content-bearing sources count. A GA4 snippet in App.jsx or a colour
// tweak in index.css changes the shipped HTML but not what the page says, and
// claiming otherwise trains crawlers to distrust our lastmod.
const SHARED_SOURCES = ['src/i18n/locales/zh.json', 'src/i18n/locales/en.json']

const routeSources = (route) => {
  if (route === '/')
    return [
      ...SHARED_SOURCES,
      'src/components/Banner.jsx',
      'src/components/Services.jsx',
      'src/components/Portfolio.jsx',
      'src/components/MediaStrip.jsx',
      'src/components/About.jsx',
      'src/components/Contact.jsx',
    ]
  if (route === '/clients') return [...SHARED_SOURCES, 'src/pages/ClientsPage.jsx', 'src/data/clients.js']
  return [
    ...SHARED_SOURCES,
    'src/pages/ClientCasePage.jsx',
    'src/components/ClientDetail.jsx',
    'src/data/clients.js',
  ]
}

function git(args) {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  } catch {
    return null
  }
}

if (git(['rev-parse', '--is-shallow-repository']) === 'true') {
  console.warn(
    'sitemap: shallow git clone — routes whose last content commit predates the fetch ' +
      'depth will ship without <lastmod>. Deepen the clone to restore it.',
  )
}

const lastModified = (paths) => git(['log', '-1', '--format=%cI', '--', ...paths]) || null

/* ── sitemap.xml with hreflang alternates (no browser needed) ── */
const undatedRoutes = []
const urlEntries = zhRoutes
  .map((r) => {
    const zh = `${SITE_URL}${r === '/' ? '/' : r}`
    const en = `${SITE_URL}${r === '/' ? '/en' : `/en${r}`}`
    const lastmod = lastModified(routeSources(r))
    if (!lastmod) undatedRoutes.push(r)
    const lastmodTag = lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''
    const alternates =
      `    <xhtml:link rel="alternate" hreflang="zh-Hant" href="${zh}"/>\n` +
      `    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>\n` +
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${zh}"/>`
    return [zh, en]
      .map((loc) => `  <url>\n    <loc>${loc}</loc>\n${lastmodTag}${alternates}\n  </url>`)
      .join('\n')
  })
  .join('\n')

writeFileSync(
  join('dist', 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    `${urlEntries}\n</urlset>\n`,
)
console.log(
  undatedRoutes.length
    ? `sitemap.xml written (no <lastmod> for: ${undatedRoutes.join(', ')})`
    : 'sitemap.xml written',
)

/* Launch the system Chromium if available; otherwise fall back to the
   lambda-compatible static build (Vercel/CI images lack browser libs). */
async function launchBrowser(chromium) {
  try {
    return await chromium.launch()
  } catch (err) {
    console.warn(`default chromium launch failed (${err.message.split('\n')[0]}); trying @sparticuz/chromium`)
    const { default: sparticuz } = await import('@sparticuz/chromium')
    return await chromium.launch({
      executablePath: await sparticuz.executablePath(),
      args: sparticuz.args,
    })
  }
}

/* ── prerender each route ─────────────────────────── */
let server
let browser
try {
  const { preview } = await import('vite')
  const { chromium } = await import('playwright')

  server = await preview({ preview: { port: PORT, strictPort: true } })
  browser = await launchBrowser(chromium)
  const page = await browser.newPage()

  // Keep the language-suggestion banner out of the prerendered markup
  await page.addInitScript(() => {
    localStorage.setItem('pixelholic_lang_banner_dismissed', '1')
  })

  for (const route of routes) {
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' })
    let html = await page.content()
    if (!/^<!doctype/i.test(html)) html = '<!doctype html>\n' + html

    const outFile = route === '/' ? join('dist', 'index.html') : join('dist', route.slice(1), 'index.html')
    mkdirSync(dirname(outFile), { recursive: true })
    writeFileSync(outFile, html)
    console.log(`prerendered ${route}`)
  }
} catch (err) {
  console.warn(`prerender skipped (build continues as plain SPA): ${err.message}`)
} finally {
  await browser?.close()
  await server?.close()
}
