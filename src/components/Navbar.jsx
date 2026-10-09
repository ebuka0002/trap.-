import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ShoppingBag, X, ArrowUpRight } from 'lucide-react'
import Modal from './Modal'
import Img from './Img'
import { useCart } from '../context/CartContext'
import { useScrollDirection } from '../hooks/hooks'
import { MENU_LINKS, NAV_LINKS, SITE } from '../data/siteData'
import { products, formatPrice } from '../data/products'
import { logoMark } from '../utils/images'

function MenuOverlay({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} label="Menu" position="full" animation="wipe">
      <div className="container-x flex min-h-full flex-col pb-8 pt-5">
        <div className="flex items-center justify-between">
          <span className="display text-2xl">TRAP</span>
          <button type="button" onClick={onClose} aria-label="Close menu" className="flex items-center gap-2 text-[12px] font-medium tracking-[0.18em]">CLOSE <X size={18} /></button>
        </div>
        <nav aria-label="Menu" className="my-auto grid gap-x-10 py-10 md:grid-cols-2">
          <ul className="space-y-0">
            {MENU_LINKS.map((l, i) => (
              <motion.li key={l.label} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                <Link to={l.to} onClick={onClose} className="group flex items-baseline justify-between border-b border-white/10 py-[0.3em] font-display text-[clamp(2.2rem,8vw,5.4rem)] uppercase leading-none transition-colors hover:text-violet-soft">
                  <span className="transition-transform duration-500 ease-expo group-hover:translate-x-3">{l.label}</span>
                  <ArrowUpRight className="opacity-0 transition-opacity group-hover:opacity-100" size={28} />
                </Link>
              </motion.li>
            ))}
          </ul>
          <div className="mt-10 hidden flex-col justify-end md:flex">
            <img src={logoMark} alt="" className="mb-6 w-40 mix-blend-screen" />
            <p className="display text-4xl">BUILT TO<br />BREAK OUT.</p>
            <p className="label mt-4 text-gold">{SITE.tagline}</p>
          </div>
        </nav>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[12px] tracking-[0.16em]">
          <a className="link-u" href={SITE.instagram} target="_blank" rel="noreferrer">INSTAGRAM</a>
          <a className="link-u" href={SITE.tiktok} target="_blank" rel="noreferrer">TIKTOK</a>
          <a className="link-u" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">WHATSAPP</a>
        </div>
      </div>
    </Modal>
  )
}

function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('')
  useEffect(() => { if (!open) setQ('') }, [open])
  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    return s ? products.filter((p) => `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(s)).slice(0, 6) : []
  }, [q])
  return (
    <Modal open={open} onClose={onClose} label="Search" position="top">
      <div className="container-x py-6 md:py-10">
        <div className="flex items-center gap-4 border-b border-white/25 pb-3">
          <Search size={22} aria-hidden />
          <input data-autofocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="SEARCH TRAP" aria-label="Search products" className="w-full bg-transparent font-display text-3xl uppercase tracking-wide placeholder:text-white/25 focus:outline-none md:text-5xl" />
          <button type="button" onClick={onClose} aria-label="Close search"><X size={24} /></button>
        </div>
        <div className="mt-6 min-h-[8rem]" aria-live="polite">
          {q && !results.length && <p className="text-mist">Nothing for “{q}”. Try tee, hoodie, polo, hat.</p>}
          <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <li key={p.slug}>
                <Link to={`/product/${p.slug}`} onClick={onClose} className="group flex items-center gap-4 border border-white/10 p-2 transition-colors hover:border-white/40">
                  <div className="mat h-20 w-20 shrink-0 overflow-hidden">{p.images[0] ? <Img name={p.images[0].key} alt="" sizes="80px" /> : <div className="grid h-full place-items-center text-[10px] text-ink">SOON</div>}</div>
                  <div><p className="text-[13px] font-medium uppercase tracking-wider">{p.name}</p><p className="text-sm text-mist">{formatPrice(p.price)}</p></div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  )
}

export default function Navbar() {
  const { count, setOpen } = useCart()
  const { hidden, scrolled } = useScrollDirection()
  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  useEffect(() => { setMenu(false); setSearch(false) }, [pathname])

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-100%' : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? 'bg-ink/85 backdrop-blur-md' : 'bg-gradient-to-b from-black/60 to-transparent'}`}
      >
        <div className="container-x grid h-16 grid-cols-[1fr_auto_1fr] items-center md:h-20">
          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.label} to={l.to} className="link-u text-[12px] font-medium tracking-[0.2em]">{l.label}</NavLink>
            ))}
          </nav>
          <button type="button" onClick={() => setMenu(true)} aria-label="Open menu" className="justify-self-start text-[12px] font-medium tracking-[0.18em] lg:hidden">MENU</button>

          <Link to="/" aria-label="TRAP — home" className="flex items-center gap-2.5 justify-self-center">
            <img src={logoMark} alt="" width="36" height="31" className="h-7 w-auto mix-blend-screen md:h-8" />
            <span className="display text-[1.7rem] tracking-[0.04em] md:text-3xl">TRAP</span>
          </Link>

          <div className="flex items-center justify-end gap-5 md:gap-7">
            <button type="button" onClick={() => setSearch(true)} aria-label="Search" className="flex items-center gap-2 text-[12px] font-medium tracking-[0.18em]">
              <Search size={18} strokeWidth={1.6} /><span className="hidden xl:inline">SEARCH</span>
            </button>
            <button type="button" onClick={() => setOpen(true)} aria-label={`Cart, ${count} items`} className="relative flex items-center gap-2 text-[12px] font-medium tracking-[0.18em]">
              <ShoppingBag size={18} strokeWidth={1.6} /><span className="hidden xl:inline">CART</span>
              {count > 0 && <span className="absolute -right-2.5 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-violet px-1 text-[10px] font-bold xl:static xl:ml-0">{count}</span>}
            </button>
            <button type="button" onClick={() => setMenu(true)} aria-label="Open menu" className="hidden text-[12px] font-medium tracking-[0.18em] lg:inline">MENU</button>
          </div>
        </div>
        <div className="naija-bar h-px opacity-70" aria-hidden />
      </motion.header>
      <MenuOverlay open={menu} onClose={() => setMenu(false)} />
      <SearchOverlay open={search} onClose={() => { setSearch(false) }} />
    </>
  )
}
