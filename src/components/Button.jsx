import { forwardRef, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const base = 'group relative inline-flex items-center justify-center gap-3 overflow-hidden font-medium uppercase tracking-[0.14em] text-[12px] md:text-[13px] select-none'
const variants = {
  solid: 'bg-bone text-ink px-7 py-4 hover:text-white',
  ghost: 'border border-white/30 text-bone px-7 py-4 hover:border-transparent hover:text-ink',
  line: 'border-b border-bone/50 text-bone pb-1 hover:border-bone',
}

/** Magnetic CTA. Renders Link / a / button depending on props. */
const Button = forwardRef(function Button({ to, href, variant = 'solid', arrow = false, magnetic = true, className = '', children, ...rest }, _ref) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    if (!magnetic || e.pointerType === 'touch') return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3)
  }
  const reset = () => { x.set(0); y.set(0) }

  const fill = variant === 'solid' ? 'bg-violet' : variant === 'ghost' ? 'bg-bone' : ''
  const inner = (
    <>
      {variant !== 'line' && (
        <span aria-hidden className={`absolute inset-0 translate-y-full transition-transform duration-500 ease-expo group-hover:translate-y-0 ${fill}`} />
      )}
      <span className="relative z-10 flex items-center gap-3">
        {children}
        {arrow && <ArrowRight size={16} strokeWidth={1.8} className="transition-transform duration-500 ease-expo group-hover:translate-x-1.5" />}
      </span>
    </>
  )
  const cls = `${base} ${variants[variant]} ${className}`
  const common = { ref, onPointerMove: onMove, onPointerLeave: reset, style: { x: sx, y: sy }, className: cls, ...rest }
  if (to) return <motion.div style={{ display: 'inline-block', x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset} ref={ref}><Link to={to} className={cls} {...rest}>{inner}</Link></motion.div>
  if (href) return <motion.a href={href} {...common}>{inner}</motion.a>
  return <motion.button type="button" {...common}>{inner}</motion.button>
})
export default Button
