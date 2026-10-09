import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Img from '../components/Img'

/**
 * SIGNATURE INTERACTION — "BUILT TO BREAK OUT."
 * A tall pinned section. The four words start stacked as a poster, then scatter
 * across the screen as you scroll (BREAK shatters letter by letter) while a photo
 * opens up from the centre behind them.
 */
const letters = 'BREAK'.split('')
const scatter = [
  { y: '-14vh', x: '-3vw', r: -9 },
  { y: '9vh', x: '-1vw', r: 6 },
  { y: '-22vh', x: '0vw', r: -3 },
  { y: '15vh', x: '2vw', r: 10 },
  { y: '-8vh', x: '4vw', r: -7 },
]

function Letter({ ch, i, p }) {
  const s = scatter[i]
  const y = useTransform(p, [0.12, 0.62], ['0vh', s.y])
  const x = useTransform(p, [0.12, 0.62], ['0vw', s.x])
  const r = useTransform(p, [0.12, 0.62], [0, s.r])
  return <motion.span style={{ y, x, rotate: r }} className="inline-block">{ch}</motion.span>
}

export default function BreakOut() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const built = { x: useTransform(p, [0.1, 0.6], ['0vw', '-30vw']), y: useTransform(p, [0.1, 0.6], ['0vh', '-24vh']), r: useTransform(p, [0.1, 0.6], [0, -5]) }
  const to = { x: useTransform(p, [0.1, 0.6], ['0vw', '32vw']), y: useTransform(p, [0.1, 0.6], ['0vh', '-26vh']), r: useTransform(p, [0.1, 0.6], [0, 4]) }
  const brk = { x: useTransform(p, [0.1, 0.6], ['0vw', '-6vw']), y: useTransform(p, [0.1, 0.6], ['0vh', '4vh']) }
  const out = { x: useTransform(p, [0.1, 0.6], ['0vw', '26vw']), y: useTransform(p, [0.1, 0.6], ['0vh', '27vh']), r: useTransform(p, [0.1, 0.6], [0, 5]) }
  const clip = useTransform(p, [0.3, 0.85], ['inset(48% 48% 48% 48%)', 'inset(0% 0% 0% 0%)'])
  const scale = useTransform(p, [0.3, 1], [1.25, 1])
  const hint = useTransform(p, [0, 0.1], [1, 0])
  const cap = useTransform(p, [0.82, 0.95], [0, 1])

  if (reduce) {
    return (
      <section aria-label="Built to break out" className="relative grid min-h-[80svh] place-items-center overflow-hidden">
        <div className="absolute inset-0"><Img name="detail-skyline" alt="" className="opacity-40" /></div>
        <h2 className="display relative text-center text-[clamp(4rem,18vw,16rem)]">BUILT TO<br />BREAK OUT.</h2>
      </section>
    )
  }

  return (
    <section ref={ref} aria-label="Built to break out" className="relative h-[340vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          <motion.div style={{ scale }} className="h-full w-full">
            <Img name="detail-skyline" alt="" sizes="100vw" pos="50% 60%" style={{ filter: 'contrast(1.1) brightness(0.8)' }} />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/50" />
          <div className="grain-local" />
        </motion.div>

        {/* words */}
        <div aria-hidden className="absolute inset-0 grid place-items-center mix-blend-difference text-white">
          <div className="display text-center text-[min(21vw,27vh)] leading-[0.82]">
            <motion.div style={{ x: built.x, y: built.y, rotate: built.r }}>BUILT</motion.div>
            <motion.div style={{ x: to.x, y: to.y, rotate: to.r }} className="outline-text !text-transparent">TO</motion.div>
            <motion.div style={{ x: brk.x, y: brk.y }} className="whitespace-nowrap">{letters.map((c, i) => <Letter key={i} ch={c} i={i} p={p} />)}</motion.div>
            <motion.div style={{ x: out.x, y: out.y, rotate: out.r }}>OUT.</motion.div>
          </div>
        </div>
        <h2 className="sr-only">Built to break out.</h2>

        <motion.p style={{ opacity: hint }} className="label absolute bottom-8 left-1/2 -translate-x-1/2 text-center">SCROLL TO BREAK IT</motion.p>
        <motion.div style={{ opacity: cap }} className="container-x absolute inset-x-0 bottom-8 flex items-end justify-between">
          <p className="display text-2xl md:text-4xl">MADE IN NIGERIA.</p>
          <p className="label text-bone">DON'T FIT IN.</p>
        </motion.div>
      </div>
    </section>
  )
}
