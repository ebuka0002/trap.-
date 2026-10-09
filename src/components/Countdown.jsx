import { AnimatePresence, motion } from 'framer-motion'
import { useCountdown } from '../hooks/hooks'

const pad = (n) => String(n).padStart(2, '0')

function Cell({ value, label, tick }) {
  return (
    <div className="flex flex-1 flex-col border border-white/15 px-3 py-4 md:px-6 md:py-7">
      <div className="relative h-[clamp(3.2rem,11vw,8.5rem)] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={tick ? { y: '100%' } : false}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="display absolute inset-0 block text-[clamp(3.2rem,11vw,8.5rem)] tabular-nums"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="label mt-3">{label}</span>
    </div>
  )
}

/** Configurable via the `target` ISO date (see NEXT_DROP in data/siteData.js). */
export default function Countdown({ target }) {
  const t = useCountdown(target)
  if (t.done) return <p className="display text-[clamp(3rem,10vw,8rem)]" role="status">LIVE NOW.</p>
  return (
    <div role="timer" aria-label={`${t.d} days ${t.h} hours ${t.m} minutes ${t.s} seconds until the next drop`} className="flex gap-2 md:gap-4">
      <Cell value={pad(t.d)} label="DAYS" />
      <Cell value={pad(t.h)} label="HOURS" />
      <Cell value={pad(t.m)} label="MINUTES" />
      <Cell value={pad(t.s)} label="SECONDS" tick />
    </div>
  )
}
