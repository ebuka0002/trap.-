import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Img from '../components/Img'
import Modal from '../components/Modal'
import { LOOKBOOK } from '../data/siteData'

// Editorial composition: spans + offsets + overlaps per item (desktop, 12-col).
const layout = {
  lb1: 'md:col-span-7 md:row-span-2',
  lb2: 'md:col-span-5 md:aspect-[16/10] md:self-end',
  lb3: 'md:col-span-3 md:col-start-2 md:-mt-12 z-10',
  lb4: 'md:col-span-4 md:col-start-6 md:mt-16',
  lb5: 'md:col-span-6 md:col-start-1 md:mt-4',
  lb6: 'md:col-span-3 md:col-start-8 md:-mt-24 z-10',
  lb7: 'md:col-span-3 md:col-start-10 md:mt-10',
}
const aspect = { lb1: 'aspect-[4/5]', lb2: 'aspect-[16/10]', lb3: 'aspect-[3/4]', lb4: 'aspect-[3/4]', lb5: 'aspect-[1210/1301]', lb6: 'aspect-[3/4]', lb7: 'aspect-[2/3]' }

function Viewer({ index, setIndex }) {
  const open = index !== null
  const total = LOOKBOOK.length
  const go = useCallback((d) => setIndex((i) => (i === null ? i : (i + d + total) % total)), [setIndex, total])
  useEffect(() => {
    if (!open) return
    const k = (e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open, go])
  const item = open ? LOOKBOOK[index] : null
  return (
    <Modal open={open} onClose={() => setIndex(null)} label="Lookbook image viewer" position="full">
      {item && (
        <div className="flex h-full flex-col bg-black">
          <div className="flex items-center justify-between px-5 py-4 text-[12px] tracking-[0.18em]">
            <span>{item.code}</span>
            <span className="text-mist">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
            <button type="button" onClick={() => setIndex(null)} aria-label="Close viewer" className="flex items-center gap-2">CLOSE <X size={18} /></button>
          </div>
          <motion.div key={item.id} className="relative min-h-0 flex-1 touch-pan-y" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.25} onDragEnd={(_, i) => { if (i.offset.x < -70) go(1); else if (i.offset.x > 70) go(-1) }}>
            <Img name={item.img} alt={`${item.code} ${item.title}`} priority sizes="100vw" className="!object-contain" />
          </motion.div>
          <div className="flex items-center justify-between px-5 py-5">
            <p className="display text-3xl md:text-5xl">{item.title}</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="grid h-12 w-12 place-items-center border border-white/30 hover:bg-bone hover:text-ink"><ChevronLeft /></button>
              <button type="button" onClick={() => go(1)} aria-label="Next image" className="grid h-12 w-12 place-items-center border border-white/30 hover:bg-bone hover:text-ink"><ChevronRight /></button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default function Lookbook() {
  const [index, setIndex] = useState(null)
  return (
    <section id="lookbook" aria-labelledby="look-h" className="relative py-24 md:py-40">
      <div className="container-x">
        <div className="mb-14 flex items-end justify-between md:mb-24">
          <h2 id="look-h" className="display text-[clamp(4.5rem,17vw,16rem)]">LOOK<span className="outline-text">BOOK</span></h2>
          <p className="label hidden max-w-[20ch] text-right md:block">TRAPGENESIS<br />MADE IN NIGERIA.</p>
        </div>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-x-6 md:gap-y-6">
          {LOOKBOOK.map((it, i) => (
            <motion.li
              key={it.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 1, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative ${i === 0 ? 'col-span-2' : ''} ${layout[it.id]}`}
            >
              <button type="button" onClick={() => setIndex(i)} data-cursor="VIEW" aria-label={`Open ${it.code} ${it.title}`} className="group block h-full w-full text-left">
                <div className={`relative overflow-hidden ${aspect[it.id]} ${it.id === 'lb1' ? 'md:aspect-auto md:h-full md:min-h-[44rem]' : ''}`}>
                  <Img name={it.img} alt="" pos={it.pos} sizes="(min-width:768px) 40vw, 50vw" className="transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.05]" />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
                </div>
                <p className="mt-2 flex items-baseline justify-between text-[11px] tracking-[0.18em]"><span className="text-bone">{it.code}</span><span className="text-mist">{it.title}</span></p>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
      <Viewer index={index} setIndex={setIndex} />
    </section>
  )
}
