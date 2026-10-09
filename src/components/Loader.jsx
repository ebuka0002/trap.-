import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { logoFull } from '../utils/images'

/** First-visit intro. Calls onDone when the curtain has lifted. */
export default function Loader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1900)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      role="status"
      aria-label="Loading TRAP"
    >
      <motion.img src={logoFull} alt="" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="h-56 w-56 object-contain mix-blend-screen md:h-72 md:w-72" />
      <div className="mt-4 h-px w-40 overflow-hidden bg-white/15">
        <motion.div className="h-full bg-gradient-to-r from-violet to-ice" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, ease: 'easeInOut' }} />
      </div>
    </motion.div>
  )
}
