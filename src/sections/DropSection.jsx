import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'
import { dropProducts } from '../data/products'

const rise = (d = 0) => ({ initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '0px 0px -10% 0px' }, transition: { duration: 1, delay: d, ease: [0.16, 1, 0.3, 1] } })

export default function DropSection() {
  const [feature, b, c, d, e] = dropProducts()
  return (
    <section id="drop" aria-labelledby="drop-h" className="relative py-24 md:py-40">
      <div className="container-x">
        <div className="mb-14 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
          <h2 id="drop-h" className="display text-[clamp(5rem,20vw,19rem)]">THE<br className="md:hidden" /> <span className="outline-text">DROP</span></h2>
          <div className="max-w-[30ch] md:pb-4">
            <p className="text-lg leading-snug md:text-xl">Limited pieces. Limited time. No restocks guaranteed.</p>
            <Button to="/shop" variant="line" arrow className="mt-6">VIEW ALL PIECES</Button>
          </div>
        </div>

        <div className="grid gap-x-6 gap-y-14 md:grid-cols-12">
          <motion.div {...rise()} className="md:col-span-7">
            <ProductCard product={feature} variant="feature" />
          </motion.div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:col-span-5 md:flex md:flex-col md:gap-y-16 md:pt-28">
            <motion.div {...rise(0.1)} className="md:w-[82%]"><ProductCard product={b} /></motion.div>
            <motion.div {...rise(0.2)} className="md:ml-auto md:w-[72%]"><ProductCard product={c} /></motion.div>
          </div>
          <motion.div {...rise()} className="md:col-span-4 md:col-start-2 md:mt-10"><ProductCard product={d} /></motion.div>
          <motion.div {...rise(0.1)} className="md:col-span-5 md:col-start-7 md:-mt-6"><ProductCard product={e} variant="feature" /></motion.div>
        </div>
      </div>
    </section>
  )
}
