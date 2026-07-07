export function withLang(path, lang) {
  if (lang !== 'en') return path
  return path === '/' ? '/en' : `/en${path}`
}

export function langFromPathname(pathname) {
  return pathname.startsWith('/en') ? 'en' : 'zh'
}

export function stripLangPrefix(pathname) {
  if (!pathname.startsWith('/en')) return pathname
  const rest = pathname.slice('/en'.length)
  return rest === '' ? '/' : rest
}
