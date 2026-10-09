import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

export default function ProductGrid({ items, cols = 'lg:grid-cols-3', stagger = true }) {
  return (
    <div className={`grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-5 md:gap-y-14 ${cols}`}>
      {items.map((p, i) => (
        <motion.div
          key={p.slug}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.8, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className={stagger && i % 3 === 1 ? 'lg:mt-16' : ''}
        >
          <ProductCard product={p} />
        </motion.div>
      ))}
    </div>
  )
}
