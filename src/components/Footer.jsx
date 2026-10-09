import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SITE } from '../data/siteData'
import { logoFull } from '../utils/images'

const cols = [
  { h: 'STORE', l: [['SHOP', '/shop'], ['DROPS', '/#drop'], ['ABOUT', '/#about'], ['LOOKBOOK', '/#lookbook']] },
  { h: 'HELP', l: [['CONTACT', '/info/contact'], ['SHIPPING', '/info/shipping'], ['RETURNS', '/info/returns'], ['PRIVACY', '/info/privacy']] },
]

export default function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-white/15 bg-ink">
      <div className="container-x pt-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <img src={logoFull} alt="TRAP — Passion for Fashion" width="140" height="140" loading="lazy" className="-ml-3 h-36 w-36 object-contain mix-blend-screen" />
            <p className="display mt-2 text-3xl">BUILT TO<br />BREAK OUT.</p>
          </div>
          {cols.map((c) => (
            <nav key={c.h} aria-label={c.h}>
              <p className="label mb-4">{c.h}</p>
              <ul className="space-y-2.5">{c.l.map(([t, to]) => <li key={t}><Link to={to} className="link-u text-[13px] font-medium tracking-[0.16em]">{t}</Link></li>)}</ul>
            </nav>
          ))}
          <div>
            <p className="label mb-4">SOCIAL</p>
            <ul className="space-y-2.5">
              {[['INSTAGRAM', SITE.instagram], ['TIKTOK', SITE.tiktok], ['WHATSAPP', `https://wa.me/${SITE.whatsapp}`]].map(([t, h]) => (
                <li key={t}><a href={h} target="_blank" rel="noreferrer" className="link-u inline-flex items-center gap-1 text-[13px] font-medium tracking-[0.16em]">{t}<ArrowUpRight size={13} /></a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div aria-hidden className="select-none pt-10 text-center">
        <p className="display outline-text-soft text-[clamp(8rem,38vw,34rem)] leading-[0.74] transition-colors duration-700 hover:text-white/10">TRAP</p>
      </div>
      <div className="naija-bar h-1 opacity-80" aria-hidden />
      <div className="container-x flex flex-wrap items-center justify-between gap-3 py-6 text-[11px] tracking-[0.18em] text-mist">
        <span>© 2026 TRAP</span>
        <span className="text-gold">{SITE.tagline}</span>
        <span>MADE IN NIGERIA.</span>
      </div>
    </footer>
  )
}
