import { useEffect, useRef, useState } from 'react'

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — TRAP` : 'TRAP — Passion For Fashion | Built To Break Out.'
  }, [title])
}

export function useCountdown(target) {
  const calc = () => {
    const diff = Math.max(0, new Date(target).getTime() - Date.now())
    return { d: Math.floor(diff / 864e5), h: Math.floor((diff / 36e5) % 24), m: Math.floor((diff / 6e4) % 60), s: Math.floor((diff / 1e3) % 60), done: diff === 0 }
  }
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [target])
  return t
}

export function useFinePointer() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const on = () => setFine(mq.matches)
    on()
    mq.addEventListener?.('change', on)
    return () => mq.removeEventListener?.('change', on)
  }, [])
  return fine
}

export function useScrollDirection() {
  const [state, setState] = useState({ hidden: false, scrolled: false })
  const last = useRef(0)
  useEffect(() => {
    let raf = 0
    const on = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        setState((s) => {
          const next = { scrolled: y > 40, hidden: y > 400 && y > last.current + 4 ? true : y < last.current - 4 ? false : s.hidden }
          return next.scrolled === s.scrolled && next.hidden === s.hidden ? s : next
        })
        last.current = y
      })
    }
    window.addEventListener('scroll', on, { passive: true })
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf) }
  }, [])
  return state
}
