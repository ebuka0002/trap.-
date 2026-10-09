import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Img from '../components/Img'

const art = [
  { img: 'detail-lagos', title: 'LAGOS NIGERIA', note: 'E dey pulse. E dey grind.', w: 'w-[72vw] md:w-[26vw]', mt: '' },
  { img: 'detail-flag', title: 'STAY STRONG', note: 'A flag, a bandage, a broken heart.', w: 'w-[64vw] md:w-[22vw]', mt: 'md:mt-24' },
  { img: 'detail-soldier', title: 'THE STREET', note: 'Sat on the hem, watching.', w: 'w-[58vw] md:w-[20vw]', mt: '' },
  { img: 'detail-nigeria', title: 'NIGERIA', note: 'Stitched, patched, worn loud.', w: 'w-[70vw] md:w-[24vw]', mt: 'md:mt-16' },
]

export default function Genesis() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(p, [0, 1], reduce ? ['0%', '0%'] : ['12%', '-38%'])
  const imgY = useTransform(p, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '6%'])

  return (
    <section ref={ref} id="genesis" aria-labelledby="genesis-h" className="relative overflow-hidden py-24 md:py-40">
      <motion.p aria-hidden style={{ x }} className="display outline-text-soft pointer-events-none whitespace-nowrap text-[clamp(8rem,30vw,28rem)] leading-[0.8]">TRAPGENESIS TRAPGENESIS</motion.p>

      <div className="container-x relative -mt-[8vw] grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5 md:pt-24">
          <h2 id="genesis-h" className="display text-[clamp(3.4rem,9vw,8rem)]">TRAP<br />GENESIS</h2>
          <p className="mt-8 max-w-[18ch] font-display text-[clamp(1.9rem,3.6vw,3.4rem)] uppercase leading-[1.02] md:max-w-[16ch]">Freedom was coming, but on our streets, it arrived delayed.</p>
          <p className="mt-8 max-w-[38ch] text-mist">Prints about home, hope and holding on. Lagos on the chest, Nigeria on the shoulder, a broken heart held together.</p>
        </div>
        <figure className="relative md:col-span-7">
          <div className="relative aspect-[1210/1301] overflow-hidden">
            <motion.div style={{ y: imgY, scale: 1.12 }} className="h-full w-full"><Img name="photo-airport" alt="Two models in Stay Strong hoodies at Lagos airport beneath a departures board showing a delayed flight" sizes="(min-width:768px) 58vw, 100vw" pos="50% 40%" /></motion.div>
            <div className="grain-local" />
          </div>
          <figcaption className="mt-3 flex justify-between text-[11px] tracking-[0.18em] text-mist"><span>WELCOME TO NIGERIA.</span><span>DEPARTURES: DELAYED.</span></figcaption>
        </figure>
      </div>

      <div className="mt-24 md:mt-36">
        <div className="container-x mb-6 flex items-end justify-between">
          <p className="display text-3xl md:text-5xl">THE ARTWORK</p>
          <p className="label hidden md:block">DRAG / SCROLL</p>
        </div>
        <ul data-cursor="DRAG" className="no-scrollbar flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-5 pb-4 md:gap-8 md:px-14">
          {art.map((a) => (
            <li key={a.img} className={`shrink-0 snap-center ${a.w} ${a.mt}`}>
              <div className="aspect-[4/5] overflow-hidden border border-white/15"><Img name={a.img} alt={`${a.title} artwork`} sizes="(min-width:768px) 26vw, 72vw" /></div>
              <p className="mt-3 text-[13px] font-medium tracking-[0.14em]">{a.title}</p>
              <p className="text-sm text-mist">{a.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
