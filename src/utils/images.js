// Builds srcSet automatically from /assets/img/<name>-<width>.webp
const files = import.meta.glob('../assets/img/*.{webp,png}', { eager: true, query: '?url', import: 'default' })
const registry = {}
for (const [path, url] of Object.entries(files)) {
  const m = path.match(/\/([^/]+?)-(\d+)\.webp$/)
  if (m) (registry[m[1]] ||= []).push({ w: Number(m[2]), url })
}
export function img(name) {
  const list = registry[name]
  if (!list) return { src: '', srcSet: '' }
  const sorted = [...list].sort((a, b) => a.w - b.w)
  return { src: sorted[sorted.length - 1].url, srcSet: sorted.map((x) => `${x.url} ${x.w}w`).join(', ') }
}
export const logoMark = files['../assets/img/logo-mark.png']
export const logoFull = files['../assets/img/logo-full.png']
