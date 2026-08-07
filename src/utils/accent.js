/**
 * Text-safe counterpart for an accent colour.
 *
 * The accents are picked to sit alongside the logo mark, which optimises for
 * how they look as fills — not for legibility as type. Half of them land under
 * WCAG AA on white once they carry text: cyan 3.68:1, teal 3.74:1, coral
 * 3.56:1, amber 3.19:1 (4.5:1 required at the sizes this site uses them).
 *
 * Each entry below is the same hue one step darker, so the relationship to the
 * mark survives while the text clears AA. Use ink() wherever an accent colours
 * text; keep the raw accent for fills, borders, bars, and icons.
 */
const INK = {
  '#4338CA': '#4338CA', // indigo — 7.90:1, already clear
  '#5B4FD6': '#5B4FD6', // violet — 5.94:1, already clear
  '#0891B2': '#0E7490', // cyan   — 3.68 → 5.36:1
  '#0D9488': '#0F766E', // teal   — 3.74 → 5.47:1
  '#EA580C': '#C2410C', // coral  — 3.56 → 5.18:1
  '#C2410C': '#C2410C', // coral ink itself
  '#D97706': '#B45309', // amber  — 3.19 → 5.02:1
}

export function ink(color) {
  return INK[String(color).toUpperCase()] || color
}
