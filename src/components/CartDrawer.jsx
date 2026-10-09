import { Link } from 'react-router-dom'
import { Minus, Plus, X } from 'lucide-react'
import Modal from './Modal'
import Img from './Img'
import Button from './Button'
import { useCart } from '../context/CartContext'
import { formatPrice, getProduct } from '../data/products'
import { orderMessage, waLink } from '../utils/whatsapp'

export default function CartDrawer() {
  const { open, setOpen, items, subtotal, setQty, remove, count } = useCart()
  const close = () => setOpen(false)
  const checkout = () => window.open(waLink(orderMessage(items)), '_blank', 'noopener')

  return (
    <Modal open={open} onClose={close} label="Shopping cart" position="right">
      <div className="flex items-center justify-between border-b border-white/15 px-5 py-5">
        <h2 className="display text-3xl">CART <span className="text-mist">({count})</span></h2>
        <button type="button" onClick={close} aria-label="Close cart"><X size={22} /></button>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-start justify-center gap-6 px-5">
          <p className="display text-[clamp(3rem,12vw,5rem)]">NOTHING<br />IN HERE.<br /><span className="outline-text">YET.</span></p>
          <p className="max-w-[28ch] text-mist">Limited pieces don't wait. Start with the drop.</p>
          <Button to="/shop" arrow onClick={close}>SHOP THE DROP</Button>
        </div>
      ) : (
        <>
          <ul className="flex-1 divide-y divide-white/10 overflow-y-auto px-5">
            {items.map((i) => {
              const p = getProduct(i.slug)
              return (
                <li key={i.id} className="flex gap-4 py-5">
                  <Link to={`/product/${p.slug}`} onClick={close} className="mat block h-28 w-28 shrink-0 overflow-hidden"><Img name={p.images[i.imageIndex ?? 0]?.key || p.images[0].key} alt={p.images[0].alt} sizes="112px" /></Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <h3 className="text-[13px] font-medium uppercase tracking-wider">{p.name}</h3>
                      <button type="button" onClick={() => remove(i.id)} aria-label={`Remove ${p.name}`} className="text-mist hover:text-bone"><X size={16} /></button>
                    </div>
                    <p className="mt-1 text-[12px] tracking-widest text-mist">SIZE {i.size}{i.color ? ` · ${i.color.toUpperCase()}` : ''}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-white/25">
                        <button type="button" aria-label="Decrease quantity" onClick={() => (i.qty === 1 ? remove(i.id) : setQty(i.id, i.qty - 1))} className="p-2"><Minus size={14} /></button>
                        <span className="w-8 text-center text-sm" aria-live="polite">{i.qty}</span>
                        <button type="button" aria-label="Increase quantity" onClick={() => setQty(i.id, i.qty + 1)} className="p-2"><Plus size={14} /></button>
                      </div>
                      <span className="text-sm">{formatPrice(p.price * i.qty)}</span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="space-y-4 border-t border-white/15 p-5">
            <div className="flex items-baseline justify-between"><span className="label">SUBTOTAL</span><span className="display text-3xl">{formatPrice(subtotal)}</span></div>
            <p className="text-[12px] text-mist">Delivery confirmed on WhatsApp. Checkout sends your order straight to TRAP.</p>
            <Button onClick={checkout} arrow className="w-full">CHECKOUT</Button>
            <button type="button" onClick={close} className="link-u w-full text-center text-[12px] font-medium tracking-[0.18em]">CONTINUE SHOPPING</button>
          </div>
        </>
      )}
    </Modal>
  )
}
