import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import Button from '../components/Button'
import { CATEGORIES, SORTS } from '../data/siteData'
import { products } from '../data/products'
import { useDocumentTitle } from '../hooks/hooks'

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const cat = CATEGORIES.some((c) => c.id === params.get('cat')) ? params.get('cat') : 'all'
  const sort = SORTS.some((s) => s.id === params.get('sort')) ? params.get('sort') : 'newest'
  useDocumentTitle(cat === 'all' ? 'Shop' : `Shop ${cat}`)

  const set = (k, v, def) => {
    const n = new URLSearchParams(params)
    v === def ? n.delete(k) : n.set(k, v)
    setParams(n, { replace: true })
  }
  const counts = useMemo(() => Object.fromEntries(CATEGORIES.map((c) => [c.id, c.id === 'all' ? products.length : products.filter((p) => p.category === c.id).length])), [])
  const list = useMemo(() => {
    const l = products.filter((p) => cat === 'all' || p.category === cat)
    // pieces that are "soon" always sit last
    const key = { newest: (a, b) => b.added - a.added, 'price-asc': (a, b) => a.price - b.price, 'price-desc': (a, b) => b.price - a.price }[sort]
    return [...l].sort((a, b) => (a.status === 'soon') - (b.status === 'soon') || key(a, b))
  }, [cat, sort])

  return (
    <div className="pt-28 md:pt-36">
      <div className="container-x">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h1 className="display text-[clamp(5rem,22vw,20rem)]">SHOP<span className="outline-text">.</span></h1>
          <p className="max-w-[28ch] pb-3 text-mist">No ordinary pieces. Once a size is gone, it's gone.</p>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-y border-white/15 py-4 md:flex-row md:items-center md:justify-between">
          <div role="tablist" aria-label="Filter by category" className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto">
            {CATEGORIES.map((c) => (
              <button key={c.id} role="tab" aria-selected={cat === c.id} onClick={() => set('cat', c.id, 'all')}
                className={`shrink-0 px-4 py-2.5 text-[12px] font-medium tracking-[0.18em] transition-colors ${cat === c.id ? 'bg-bone text-ink' : 'text-bone/70 hover:text-bone'}`}>
                {c.label} <sup className="ml-0.5 text-[9px] opacity-60">{counts[c.id]}</sup>
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 text-[12px] font-medium tracking-[0.18em]">
            <span className="text-mist">SORT</span>
            <select value={sort} onChange={(e) => set('sort', e.target.value, 'newest')} className="cursor-pointer border border-white/25 bg-ink px-3 py-2.5 text-[12px] tracking-[0.12em]">
              {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </label>
        </div>

        <p className="sr-only" role="status" aria-live="polite">{list.length} pieces shown</p>
        <div className="mt-12">
          {list.length ? (
            <ProductGrid key={`${cat}-${sort}`} items={list} />
          ) : (
            <div className="py-24"><p className="display text-6xl">NOTHING HERE YET.</p><Button to="/shop" className="mt-8">SEE EVERYTHING</Button></div>
          )}
        </div>
      </div>
    </div>
  )
}
