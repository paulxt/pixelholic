/**
 * Pixelholic Toolbox — the free site-audit tool on its own domain.
 *
 * Linked from the apex host, which is what the tool's own canonical points at,
 * so the link lands on the URL Google treats as authoritative rather than on a
 * www duplicate. Every entry point carries a campaign so the tool's analytics
 * can tell which one sent the visitor; without it the traffic reads as direct.
 */
const BASE = 'https://pixelholic-toolbox.com/'

export function toolboxUrl(campaign) {
  return `${BASE}?utm_source=pixelholic&utm_medium=site&utm_campaign=${campaign}`
}
