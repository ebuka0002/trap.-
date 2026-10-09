import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Cursor from './components/Cursor'
import Grain from './components/Grain'
import Loader from './components/Loader'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const Shop = lazy(() => import('./pages/Shop'))
const Product = lazy(() => import('./pages/Product'))
const Info = lazy(() => import('./pages/Info'))

const safe = { get: (k) => { try { return sessionStorage.getItem(k) } catch { return null } }, set: (k, v) => { try { sessionStorage.setItem(k, v) } catch { /* ignore */ } } }

function useHashScroll(introDone) {
  const { pathname, hash } = useLocation()
  const prev = useRef(null)
  useEffect(() => {
    if (!hash || !introDone) { prev.current = pathname; return }
    const delay = prev.current === null ? 400 : prev.current !== pathname ? 750 : 40
    prev.current = pathname
    const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), delay)
    return () => clearTimeout(t)
  }, [pathname, hash, introDone])
}

export default function App() {
  const location = useLocation()
  const reduce = useReducedMotion()
  const [intro, setIntro] = useState(() => typeof window !== 'undefined' && !safe.get('trap_intro') && !reduce)
  const done = useCallback(() => { safe.set('trap_intro', '1'); setIntro(false) }, [])
  useHashScroll(!intro)

  return (
    <>
      <a href="#main" className="sr-only z-[110] bg-bone px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Skip to content</a>
      <AnimatePresence>{intro && <Loader onDone={done} />}</AnimatePresence>
      <Grain />
      <Cursor />
      <Navbar />
      <CartDrawer />
      <AnimatePresence mode="wait" onExitComplete={() => { if (!window.location.hash) window.scrollTo(0, 0) }}>
        <motion.main key={location.pathname} id="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <Suspense fallback={<div className="grid min-h-[70svh] place-items-center"><div className="skeleton h-2 w-40" role="status" aria-label="Loading" /></div>}>
            <Routes location={location}>
              <Route path="/" element={<Home ready={!intro} />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<Product />} />
              <Route path="/info/:slug" element={<Info />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </motion.main>
      </AnimatePresence>
    </>
  )
}
