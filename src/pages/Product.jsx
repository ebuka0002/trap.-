import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import Img from '../components/Img'
import Button from '../components/Button'
import Accordion from '../components/Accordion'
import ProductGrid from '../components/ProductGrid'
import NotFound from './NotFound'
import { useCart } from '../context/CartContext'
import { ACCORDIONS } from '../data/siteData'
import { formatPrice, getProduct, products } from '../data/products'
import { useDocumentTitle } from '../hooks/hooks'
import { waLink } from '../utils/whatsapp'

export default function Product() {
  const { slug } = useParams()
  const p = getProduct(slug)
  const { add } = useCart()
  const [size, setSize] = useState(null)
  const [qty, setQty] = useState(1)
  const [color, setColor] = useState(null)
  const [active, setActive] = useState(0)
  const [hint, setHint] = useState(false)
  const scroller = useRef(null)
  const slides = useRef([])
  useDocumentTitle(p?.name)

  useEffect(() => { setSize(null); setQty(1); setColor(p?.colors?.[0]?.name ?? null); setActive(0); setHint(false) }, [slug])
  if (!p) return <NotFound />

  const soon = p.status === 'soon'
  const onScroll = () => {
    const el = scroller.current
    if (el && window.innerWidth < 768) setActive(Math.round(el.scrollLeft / el.clientWidth))
  }
  const pickColor = (c) => {
    setColor(c.name)
    slides.current[c.image]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }
  const submit = () => {
    if (!size) { setHint(true); return }
    const imageIndex = p.colors?.find((c) => c.name === color)?.image ?? 0
    add({ slug: p.slug, size, color: color || undefined, qty, imageIndex })
  }
  const related = [...products.filter((o) => o.slug !== p.slug && o.status !== 'soon')].sort((a, b) => (b.category === p.category) - (a.category === p.category) || b.added - a.added).slice(0, 4)

  return (
    <div className="pt-20 md:pt-28 pb-20 md:pb-0">
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="mb-4 flex gap-2 text-[11px] tracking-[0.18em] text-mist">
          <Link to="/shop" className="link-u">SHOP</Link>/<Link to={`/shop?cat=${p.category}`} className="link-u">{p.category.toUpperCase()}</Link>
        </nav>
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          {/* gallery — swipe carousel on mobile, editorial stack on desktop */}
          <div className="min-w-0">
            {soon ? (
              <div className="grid aspect-square place-items-center border border-white/15 bg-graphite"><span className="display outline-text-soft text-[clamp(6rem,20vw,16rem)]">SOON</span></div>
            ) : (
              <>
                <div ref={scroller} onScroll={onScroll} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto md:grid md:grid-cols-2 md:gap-3 md:overflow-visible" aria-label={`${p.name} images`}>
                  {p.images.map((im, i) => (
                    <div key={i} ref={(el) => (slides.current[i] = el)} className={`mat relative aspect-square min-w-full snap-center overflow-hidden md:min-w-0 ${i === 0 ? 'md:col-span-2' : ''}`}>
                      <Img name={im.key} alt={im.alt} pos={im.pos} priority={i === 0} sizes={i === 0 ? '(min-width:1024px) 55vw, 100vw' : '(min-width:1024px) 27vw, 100vw'} />
                    </div>
                  ))}
                </div>
                {p.images.length > 1 && (
                  <div className="mt-3 flex justify-center gap-2 md:hidden" aria-hidden>
                    {p.images.map((_, i) => <span key={i} className={`h-1 transition-all ${i === active ? 'w-8 bg-bone' : 'w-3 bg-white/30'}`} />)}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-wrap gap-2">
              {p.tags?.includes('limited') && <span className="border border-white/40 px-2.5 py-1 text-[10px] font-bold tracking-[0.2em]">LIMITED DROP</span>}
              {p.tags?.includes('new') && <span className="bg-bone px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] text-ink">NEW</span>}
            </div>
            <h1 className="display mt-4 text-[clamp(3rem,6vw,5.5rem)]">{p.name}</h1>
            <p className="mt-4 text-2xl">{formatPrice(p.price)}</p>
            <p className="mt-5 max-w-[46ch] leading-relaxed text-bone/80">{p.description}</p>

            {soon ? (
              <div className="mt-10"><Button href={waLink(`Hi TRAP, notify me when ${p.name} drops.`)} target="_blank" rel="noreferrer" arrow>NOTIFY ME ON WHATSAPP</Button></div>
            ) : (
              <>
                {p.colors && (
                  <div className="mt-8">
                    <p className="label mb-3">COLOUR — <span className="text-bone">{color}</span></p>
                    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Colour">
                      {p.colors.map((c) => (
                        <button key={c.name} type="button" role="radio" aria-checked={color === c.name} onClick={() => pickColor(c)} className={`border px-4 py-2.5 text-[12px] font-medium tracking-[0.12em] transition-colors ${color === c.name ? 'border-bone bg-bone text-ink' : 'border-white/30 hover:border-bone'}`}>{c.name.toUpperCase()}</button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-8">
                  <div className="mb-3 flex justify-between"><p className="label">SIZE</p><button type="button" onClick={() => document.getElementById('acc-size')?.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="link-u text-[11px] tracking-[0.18em]">SIZE GUIDE</button></div>
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Size">
                    {p.sizes.map((s) => {
                      const out = p.soldOut.includes(s)
                      return <button key={s} type="button" role="radio" aria-checked={size === s} disabled={out} onClick={() => { setSize(s); setHint(false) }} className={`min-w-[3.4rem] border px-4 py-3 text-[13px] font-bold tracking-wider transition-colors ${out ? 'border-white/10 text-white/25 line-through' : size === s ? 'border-bone bg-bone text-ink' : 'border-white/30 hover:border-bone'}`}>{s}</button>
                    })}
                  </div>
                  <p role="alert" className={`mt-3 h-5 text-sm text-violet-soft ${hint ? '' : 'invisible'}`}>Pick a size first.</p>
                </div>
                <div className="mt-4 flex gap-3">
                  <div className="flex items-center border border-white/30">
                    <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-4"><Minus size={16} /></button>
                    <span className="w-8 text-center" aria-live="polite">{qty}</span>
                    <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(10, q + 1))} className="p-4"><Plus size={16} /></button>
                  </div>
                  <Button onClick={submit} className="flex-1" arrow>ADD TO CART</Button>
                </div>
              </>
            )}
            <div className="mt-10"><Accordion items={ACCORDIONS(p)} /></div>
            <span id="acc-size" className="block" />
          </div>
        </div>

        <section aria-labelledby="like-h" className="mt-28">
          <h2 id="like-h" className="display mb-10 text-[clamp(3rem,8vw,7rem)]">YOU MAY<br />ALSO <span className="outline-text">LIKE</span></h2>
          <ProductGrid items={related} cols="lg:grid-cols-4" stagger={false} />
        </section>
      </div>
      {!soon && (
        <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-white/15 bg-ink/95 px-5 py-3 backdrop-blur-md md:hidden">
          <div className="min-w-0"><p className="truncate text-[12px] font-medium tracking-wider">{p.name}</p><p className="text-sm text-mist">{size ? `SIZE ${size} · ` : ''}{formatPrice(p.price * qty)}</p></div>
          <Button onClick={submit} magnetic={false} className="shrink-0 !px-6 !py-3">{size ? 'ADD TO CART' : 'SELECT SIZE'}</Button>
        </div>
      )}
    </div>
  )
}
