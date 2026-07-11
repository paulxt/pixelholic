/**
 * Post-build prerender: serves dist/ with vite preview, renders every route
 * in headless Chromium, and writes the resulting HTML back into dist/ so
 * crawlers (and link previews) see full content without executing JS.
 * Also emits dist/sitemap.xml with hreflang alternates.
 */
import { preview } from 'vite'
import { chromium } from 'playwright'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'

const SITE_URL = 'https://pixelholic.co'
const PORT = 4173

const clientIds = ['kingcart', 'polaris', 'cmei', 'yunyang', 'woolbuddy', 'letape']
const zhRoutes = ['/', '/clients', ...clientIds.map((id) => `/clients/${id}`)]
const routes = [...zhRoutes, ...zhRoutes.map((r) => (r === '/' ? '/en' : `/en${r}`))]

const server = await preview({ preview: { port: PORT, strictPort: true } })
const browser = await chromium.launch()
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

/* ── sitemap.xml with hreflang alternates ─────────── */
const urlEntries = zhRoutes
  .map((r) => {
    const zh = `${SITE_URL}${r === '/' ? '/' : r}`
    const en = `${SITE_URL}${r === '/' ? '/en' : `/en${r}`}`
    const alternates =
      `    <xhtml:link rel="alternate" hreflang="zh-Hant" href="${zh}"/>\n` +
      `    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>\n` +
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${zh}"/>`
    return [zh, en]
      .map((loc) => `  <url>\n    <loc>${loc}</loc>\n${alternates}\n  </url>`)
      .join('\n')
  })
  .join('\n')

writeFileSync(
  join('dist', 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    `${urlEntries}\n</urlset>\n`,
)
console.log('sitemap.xml written')

await browser.close()
await server.close()
