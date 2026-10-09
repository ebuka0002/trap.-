import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

const FOCUSABLE = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])'

/**
 * Accessible dialog shell: portal, scroll-lock, ESC, focus trap + restore.
 * position: 'center' | 'right' | 'top' | 'full'
 */
export default function Modal({ open, onClose, label, position = 'center', animation = 'fade', children, panelClassName = '' }) {
  const panel = useRef(null)

  useEffect(() => {
    if (!open) return
    const prev = document.activeElement
    const sbw = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`
    const t = setTimeout(() => {
      const el = panel.current?.querySelector('[data-autofocus]') || panel.current?.querySelector(FOCUSABLE) || panel.current
      el?.focus?.({ preventScroll: true })
    }, 60)
    const onKey = (e) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab' || !panel.current) return
      const f = [...panel.current.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null)
      if (!f.length) return
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      prev?.focus?.({ preventScroll: true })
    }
  }, [open, onClose])

  const pos = {
    center: { wrap: 'items-center justify-center p-4', panel: 'relative w-full max-w-2xl max-h-[88svh] overflow-y-auto bg-coal border border-white/15', init: { opacity: 0, y: 24, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 12 } },
    right: { wrap: 'justify-end', panel: 'relative h-full w-full max-w-[440px] bg-coal border-l border-white/15 flex flex-col', init: { x: '100%' }, show: { x: 0 }, exit: { x: '100%' } },
    top: { wrap: 'items-start', panel: 'relative w-full max-h-[92svh] overflow-y-auto bg-coal border-b border-white/15', init: { y: '-100%' }, show: { y: 0 }, exit: { y: '-100%' } },
    full: animation === 'wipe'
      ? { wrap: '', panel: 'relative h-full w-full bg-ink overflow-y-auto', init: { clipPath: 'inset(0 0 100% 0)' }, show: { clipPath: 'inset(0 0 0% 0)' }, exit: { clipPath: 'inset(0 0 100% 0)' } }
      : { wrap: '', panel: 'relative h-full w-full bg-ink/95', init: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } },
  }[position]

  if (typeof document === 'undefined') return null
  return createPortal(
    <AnimatePresence>
      {open && (
        <div className={`fixed inset-0 z-[70] flex ${pos.wrap}`} role="dialog" aria-modal="true" aria-label={label}>
          {position !== 'full' && (
            <motion.div className="absolute inset-0 bg-black/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden />
          )}
          <motion.div
            ref={panel}
            tabIndex={-1}
            className={`${pos.panel} ${panelClassName} outline-none`}
            initial={pos.init}
            animate={pos.show}
            exit={pos.exit}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
