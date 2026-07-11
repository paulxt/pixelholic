import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { langFromPathname, stripLangPrefix, withLang } from '../utils/langPath'

export const SITE_URL = 'https://pixelholic.co'

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href, hreflang) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (hreflang) el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Per-route head manager: title, description, canonical, hreflang
 * alternates, Open Graph and Twitter cards. Rendered once per page
 * so prerendered HTML carries the right tags for crawlers.
 */
export default function Seo({ title, description }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const lang = langFromPathname(pathname)
    const basePath = stripLangPrefix(pathname)
    const zhUrl = SITE_URL + basePath
    const enUrl = SITE_URL + withLang(basePath, 'en')
    const url = lang === 'en' ? enUrl : zhUrl

    document.title = title
    upsertMeta('name', 'description', description)

    upsertLink('canonical', url)
    upsertLink('alternate', zhUrl, 'zh-Hant')
    upsertLink('alternate', enUrl, 'en')
    upsertLink('alternate', zhUrl, 'x-default')

    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', 'PIXELHOLIC')
    upsertMeta('property', 'og:image', `${SITE_URL}/og.png`)
    upsertMeta('property', 'og:locale', lang === 'en' ? 'en_US' : 'zh_TW')

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', `${SITE_URL}/og.png`)
  }, [pathname, title, description])

  return null
}
