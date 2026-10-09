import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

export default function Accordion({ items, defaultOpen = 'details' }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-t border-white/15">
      {items.map((it) => {
        const isOpen = open === it.id
        return (
          <div key={it.id} className="border-b border-white/15">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`acc-${it.id}`}
                onClick={() => setOpen(isOpen ? null : it.id)}
                className="flex w-full items-center justify-between py-5 text-left text-[13px] font-medium uppercase tracking-[0.16em]"
              >
                {it.title}
                <Plus size={18} className={`transition-transform duration-500 ease-expo ${isOpen ? 'rotate-45' : ''}`} />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`acc-${it.id}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 pb-6 text-[15px] leading-relaxed text-bone/75">
                    {it.body?.map((p, i) => <p key={i}>{p}</p>)}
                    {it.table && (
                      <>
                        <table className="w-full text-left text-sm">
                          <thead><tr className="text-mist">{it.table.head.map((h) => <th key={h} className="py-2 pr-4 text-[11px] font-medium tracking-widest">{h} {h !== 'SIZE' && <span className="text-mist/60">(CM)</span>}</th>)}</tr></thead>
                          <tbody>{it.table.rows.map((r) => <tr key={r[0]} className="border-t border-white/10">{r.map((c, i) => <td key={i} className={`py-2 pr-4 ${i === 0 ? 'font-medium text-bone' : ''}`}>{c}</td>)}</tr>)}</tbody>
                        </table>
                        <p className="text-sm text-mist">{it.table.note}</p>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
