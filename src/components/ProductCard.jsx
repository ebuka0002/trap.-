import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, X } from 'lucide-react'
import Img from './Img'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import { waLink } from '../utils/whatsapp'

function Tags({ p }) {
  const t = p.tags?.includes('limited') ? 'LIMITED' : p.tags?.includes('new') ? 'NEW' : null
  if (!t) return null
  return <span className="absolute left-3 top-3 z-10 bg-ink px-2.5 py-1 text-[10px] font-bold tracking-[0.18em] text-bone">{t}</span>
}

function Sizes({ p, onPick, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`} role="group" aria-label={`Quick add ${p.name}`}>
      {p.sizes.map((s) => {
        const out = p.soldOut.includes(s)
        return (
          <button
            key={s}
            type="button"
            disabled={out}
            onClick={() => onPick(s)}
            aria-label={out ? `${s} sold out` : `Add size ${s} to cart`}
            className={`min-w-[2.6rem] border px-2.5 py-2 text-[11px] font-bold tracking-wider transition-colors ${out ? 'border-white/10 text-white/25 line-through' : 'border-white/40 text-bone hover:bg-bone hover:text-ink'}`}
          >
            {s}
          </button>
        )
      })}
    </div>
  )
}

function SoonCard({ p, className }) {
  return (
    <article className={`group ${className}`}>
      <div className="relative flex aspect-square flex-col justify-between overflow-hidden border border-white/15 bg-graphite p-5">
        <span className="label">NEXT DROP</span>
        <span className="display outline-text-soft text-[clamp(4rem,12vw,9rem)]">SOON</span>
        <a href={waLink(`Hi TRAP, notify me when ${p.name} drops.`)} target="_blank" rel="noreferrer" className="link-u text-[12px] font-medium tracking-[0.16em]">NOTIFY ME ON WHATSAPP</a>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <h3 className="text-[13px] font-medium uppercase tracking-[0.1em]">{p.name}</h3>
        <span className="text-[13px] text-mist">{formatPrice(p.price)}</span>
      </div>
    </article>
  )
}

/** variant: 'feature' | 'standard' — only affects type scale; aspect stays 1:1 so garment crops never distort. */
export default function ProductCard({ product: p, variant = 'standard', className = '' }) {
  const { add } = useCart()
  const [picking, setPicking] = useState(false)
  if (p.status === 'soon') return <SoonCard p={p} className={className} />

  const [a, b] = p.images
  const quick = (size) => { add({ slug: p.slug, size, color: p.colors?.[0]?.name }); setPicking(false) }
  const avail = p.sizes.filter((s) => !p.soldOut.includes(s))

  return (
    <article className={`group relative ${className}`}>
      <div className="relative">
        <Link to={`/product/${p.slug}`} data-cursor="VIEW" aria-label={`View ${p.name}`} className="relative block aspect-square overflow-hidden mat">
          <Tags p={p} />
          <Img name={a.key} alt={a.alt} pos={a.pos} sizes={variant === 'feature' ? '(min-width:768px) 55vw, 100vw' : '(min-width:768px) 30vw, 50vw'} className={`transition-transform duration-[1200ms] ease-expo ${b ? '' : 'group-hover:scale-[1.06]'} ${b ? 'group-hover:scale-[1.04]' : ''}`} />
          {b && (
            <Img name={b.key} alt="" aria-hidden pos={b.pos} sizes="(min-width:768px) 30vw, 50vw" className="absolute inset-0 !opacity-0 transition-all duration-700 ease-expo group-hover:!opacity-100 group-hover:scale-[1.04]" />
          )}
        </Link>
        {/* Desktop hover quick add */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-3 bg-gradient-to-t from-black/80 to-transparent p-3 pt-14 opacity-0 transition-all duration-500 ease-expo group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 md:block">
          <p className="mb-2 text-[10px] font-bold tracking-[0.2em] text-bone/80">QUICK ADD</p>
          <Sizes p={p} onPick={quick} />
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className={`font-medium uppercase tracking-[0.08em] ${variant === 'feature' ? 'text-base md:text-lg' : 'text-[13px]'}`}>
            <Link to={`/product/${p.slug}`} className="link-u">{p.name}</Link>
          </h3>
          <span className={`shrink-0 ${variant === 'feature' ? 'text-base md:text-lg' : 'text-[13px]'}`}>{formatPrice(p.price)}</span>
        </div>
        <p className="mt-1.5 text-[11px] tracking-[0.14em] text-mist" aria-label={`Available sizes: ${avail.join(', ')}`}>
          {p.sizes.map((s, i) => (
            <span key={s} className={p.soldOut.includes(s) ? 'text-white/25 line-through' : ''}>{s}{i < p.sizes.length - 1 ? '  ' : ''}</span>
          ))}
        </p>
        <button type="button" onClick={() => setPicking((v) => !v)} aria-expanded={picking} className="mt-3 flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] md:hidden">
          {picking ? <X size={14} /> : <Plus size={14} />} QUICK ADD
        </button>
        {picking && <Sizes p={p} onPick={quick} className="mt-3 md:hidden" />}
      </div>
    </article>
  )
}
