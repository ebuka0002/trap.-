import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer } from '../hooks/hooks'

/** Desktop-only ring that follows the pointer and reacts to links / [data-cursor] labels. */
export default function Cursor() {
  const fine = useFinePointer()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 })
  const [state, setState] = useState({ big: false, label: '' })

  useEffect(() => {
    if (!fine) return
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e) => {
      const lab = e.target.closest?.('[data-cursor]')
      const act = e.target.closest?.('a,button,[role="button"],input,select')
      setState(lab ? { big: true, label: lab.getAttribute('data-cursor') } : act ? { big: true, label: '' } : { big: false, label: '' })
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerover', over) }
  }, [fine, x, y])

  if (!fine) return null
  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[95] mix-blend-difference" style={{ x: sx, y: sy }}>
      <motion.div
        className="-ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-white text-[9px] font-bold tracking-widest text-white"
        animate={{ scale: state.label ? 2.1 : state.big ? 1.6 : 0.4, backgroundColor: state.big && !state.label ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        {state.label && <span className="scale-50">{state.label}</span>}
      </motion.div>
    </motion.div>
  )
}
