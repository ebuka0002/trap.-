import { motion } from 'framer-motion'
import Img from '../components/Img'
import Button from '../components/Button'
import { logoMark } from '../utils/images'
import { SITE } from '../data/siteData'

const pillars = [
  ['INDIVIDUALITY', 'No two people break out the same way.'],
  ['MOVEMENT', 'Cut to move. Made for the street, the bus, the night.'],
  ['SELF-EXPRESSION', 'Wear the print. Say the thing.'],
]

export default function BrandStory() {
  return (
    <section id="about" aria-labelledby="about-h" className="relative py-24 md:py-40">
      <div className="container-x grid gap-14 md:grid-cols-12">
        <div className="md:col-span-6 md:pr-8">
          <div className="flex items-center gap-3"><img src={logoMark} alt="" className="h-9 w-auto mix-blend-screen" loading="lazy" /><p className="label text-gold">{SITE.tagline}</p></div>
          <h2 id="about-h" className="display mt-8 text-[clamp(4rem,11vw,10.5rem)]">ABOUT<br /><span className="outline-text">TRAP</span></h2>
          <div className="mt-10 max-w-[44ch] space-y-5 text-lg leading-relaxed text-bone/85">
            <p>TRAP is a Nigerian premium streetwear label built around individuality, movement, self-expression and breaking away from limitations.</p>
            <p>We don't make pieces to blend in. We make them to be seen, argued about and worn out of the house.</p>
          </div>
          <dl className="mt-12 border-t border-white/15">
            {pillars.map(([t, d]) => (
              <div key={t} className="grid grid-cols-[1fr] gap-1 border-b border-white/15 py-4 md:grid-cols-[13rem_1fr] md:gap-6">
                <dt className="text-[12px] font-bold tracking-[0.2em]">{t}</dt><dd className="text-mist">{d}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12"><Button to="/shop" arrow>SHOP THE DROP</Button></div>
        </div>

        <div className="relative md:col-span-6">
          <motion.div initial={{ clipPath: 'inset(100% 0 0 0)' }} whileInView={{ clipPath: 'inset(0% 0 0 0)' }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} className="relative aspect-[3/4] overflow-hidden">
            <Img name="photo-polo-model" alt="Model in the white TRAPGENESIS Limited Edition zip polo" sizes="(min-width:768px) 45vw, 100vw" pos="50% 30%" />
            <div className="grain-local" />
          </motion.div>
          <div className="absolute -bottom-8 left-4 right-4 flex items-end justify-between md:-left-12 md:right-auto md:gap-8">
            <p className="display text-[clamp(2.2rem,5vw,4.4rem)] bg-ink px-4 py-3 leading-[0.9]">MADE IN NIGERIA.<br /><span className="grad-text">BUILT TO BREAK OUT.</span></p>
          </div>
        </div>
      </div>
    </section>
  )
}
