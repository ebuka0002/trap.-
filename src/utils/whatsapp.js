import { SITE } from '../data/siteData'
import { formatPrice, getProduct } from '../data/products'

export const waLink = (text) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`

export function orderMessage(items) {
  const lines = items.map((i) => {
    const p = getProduct(i.slug)
    return `• ${p.name}${i.color ? ` (${i.color})` : ''} / ${i.size} x${i.qty} — ${formatPrice(p.price * i.qty)}`
  })
  const total = items.reduce((s, i) => s + getProduct(i.slug).price * i.qty, 0)
  return `Hi TRAP, I'd like to order:\n\n${lines.join('\n')}\n\nSubtotal: ${formatPrice(total)}\nName:\nDelivery address:`
}
