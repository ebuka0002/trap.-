import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { getProduct } from '../data/products'

const CartCtx = createContext(null)
const KEY = 'trap_cart_v1'

function reducer(state, a) {
  switch (a.type) {
    case 'hydrate': return a.items
    case 'add': {
      const id = `${a.item.slug}|${a.item.size}|${a.item.color || ''}`
      const found = state.find((i) => i.id === id)
      if (found) return state.map((i) => (i.id === id ? { ...i, qty: Math.min(10, i.qty + a.item.qty) } : i))
      return [...state, { ...a.item, id }]
    }
    case 'qty': return state.map((i) => (i.id === a.id ? { ...i, qty: Math.max(1, Math.min(10, a.qty)) } : i))
    case 'remove': return state.filter((i) => i.id !== a.id)
    case 'clear': return []
    default: return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || '[]')
      dispatch({ type: 'hydrate', items: raw.filter((i) => getProduct(i.slug)) })
    } catch { /* storage unavailable */ }
  }, [])
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* ignore */ }
  }, [items])

  const add = useCallback((item, openDrawer = true) => {
    dispatch({ type: 'add', item: { qty: 1, ...item } })
    if (openDrawer) setOpen(true)
  }, [])

  const value = useMemo(() => {
    const count = items.reduce((s, i) => s + i.qty, 0)
    const subtotal = items.reduce((s, i) => s + (getProduct(i.slug)?.price || 0) * i.qty, 0)
    return {
      items, count, subtotal, open, setOpen, add,
      setQty: (id, qty) => dispatch({ type: 'qty', id, qty }),
      remove: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
    }
  }, [items, open, add])

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
