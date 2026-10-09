import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import Img from '../components/Img'
import Button from '../components/Button'

const ease = [0.16, 1, 0.3, 1]
// Each word enters from a different edge.
const dirs = { BUILT: { x: '-30%' }, TO: { y: '-120%' }, BREAK: { x: '30%' }, 'OUT.': { y: '120%' } }

function Word({ w, ready, delay }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.04em] align-bottom">
      <motion.span
        className="inline-block"
        initial={{ ...dirs[w], opacity: 0 }}
        animate={ready ? { x: 0, y: 0, opacity: 1 } : {}}
        transition={{ duration: 1.3, delay, ease }}
      >
        {w}
      </motion.span>
    </span>
  )
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '16%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-24%'])
  const ghostX = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-18%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const onMove = (e) => {
    if (reduce || e.pointerType === 'touch') return
    mx.set((e.clientX / window.innerWidth - 0.5) * -22)
    my.set((e.clientY / window.innerHeight - 0.5) * -14)
  }

  return (
    <section ref={ref} onPointerMove={onMove} aria-label="TRAP — Built to break out" className="relative h-[100svh] min-h-[620px] overflow-hidden">
      <motion.div style={{ y: imgY }} className="absolute inset-[-4%]">
        <motion.div style={{ x: sx, y: sy }} className="h-full w-full">
          <div className={ready ? 'animate-kenburns h-full w-full' : 'h-full w-full'}>
            <Img name="photo-railway" priority alt="Two TRAP models in Stay Strong pieces beside a rusted Nigerian Railway carriage" sizes="100vw" pos="50% 28%" />
          </div>
        </motion.div>
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/30" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />
      <div aria-hidden className="grain-local" />

      {/* Layered ghost type */}
      <motion.p aria-hidden style={{ x: ghostX, opacity: fade }} className="display outline-text-soft pointer-events-none absolute -bottom-[3vw] left-[-2vw] whitespace-nowrap text-[42vw] leading-none">TRAP</motion.p>

      <motion.div style={{ opacity: fade }} className="container-x absolute inset-x-0 top-24 flex items-start justify-between md:top-28">
        <motion.p initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.4, duration: 1 }} className="label text-bone/80">TRAPGENESIS<br />LIMITED EDITION</motion.p>
        <motion.p initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.6, duration: 1 }} className="label hidden text-right text-bone/80 md:block">LAGOS, NIGERIA<br />6.5244° N / 3.3792° E</motion.p>
      </motion.div>

      <motion.div style={{ y: textY }} className="container-x absolute inset-x-0 bottom-0 pb-10 md:pb-14">
        <h1 className="display text-[clamp(4.2rem,17.5vw,17rem)] leading-[0.82]" aria-label="Built to break out.">
          <span className="block" aria-hidden><Word w="BUILT" ready={ready} delay={0.1} /> <Word w="TO" ready={ready} delay={0.25} /></span>
          <span className="block" aria-hidden><Word w="BREAK" ready={ready} delay={0.4} /> <Word w="OUT." ready={ready} delay={0.55} /></span>
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 1, ease }}
          className="mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-[34ch] text-[15px] leading-relaxed text-bone/85 md:text-base">Premium streetwear built for those who refuse to blend in.</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button to="/shop" arrow>SHOP THE DROP</Button>
            <Button href="#about" variant="ghost" arrow onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }}>EXPLORE TRAP</Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
