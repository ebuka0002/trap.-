import { motion } from 'framer-motion'
import Countdown from '../components/Countdown'
import Button from '../components/Button'
import Img from '../components/Img'
import Marquee from '../components/Marquee'
import { NEXT_DROP } from '../data/siteData'
import { waLink } from '../utils/whatsapp'

export default function NextDrop() {
  return (
    <section id="next-drop" aria-labelledby="next-h" className="relative overflow-hidden border-y border-white/15 py-24 md:py-36">
      <div aria-hidden className="absolute -right-40 top-0 h-[60vw] w-[60vw] rounded-full bg-violet/20 blur-[140px]" />
      <div aria-hidden className="absolute -left-40 bottom-0 h-[40vw] w-[40vw] rounded-full bg-volt/15 blur-[140px]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        <div>
          <p className="label text-gold">NEXT DROP</p>
          <h2 id="next-h" className="display mt-3 text-[clamp(4.4rem,15vw,14rem)]">{NEXT_DROP.name.split(' ')[0]}<br /><span className="grad-text">{NEXT_DROP.name.split(' ')[1]}</span></h2>
          <p className="display mt-4 text-3xl text-bone/90 md:text-5xl">COMING SOON</p>
          <div className="mt-10"><Countdown target={NEXT_DROP.date} /></div>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button href={waLink('Hi TRAP, notify me when the next drop goes live.')} target="_blank" rel="noreferrer" arrow>NOTIFY ME</Button>
            <p className="max-w-[30ch] text-sm text-mist">{NEXT_DROP.blurb}</p>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 50, rotate: 3 }} whileInView={{ opacity: 1, y: 0, rotate: -2 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="relative mx-auto w-full max-w-md">
          <div className="mat aspect-square overflow-hidden border border-white/20"><Img name="stripe-jersey-white" alt="TRAPGENESIS stripe jersey, a preview of the next drop" sizes="(min-width:1024px) 30vw, 80vw" /></div>
          <span className="absolute -bottom-4 -left-4 bg-ink px-3 py-2 text-[10px] font-bold tracking-[0.2em] ring-1 ring-white/30">LIMITED BY DESIGN</span>
        </motion.div>
      </div>
      <Marquee className="relative mt-20 text-bone/90" items={['LIMITED BY DESIGN', 'NO RESTOCKS GUARANTEED', 'NO ORDINARY PIECES']} outline />
    </section>
  )
}
