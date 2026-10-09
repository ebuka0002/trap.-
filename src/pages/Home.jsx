import Hero from '../sections/Hero'
import DropSection from '../sections/DropSection'
import BreakOut from '../sections/BreakOut'
import NextDrop from '../sections/NextDrop'
import Genesis from '../sections/Genesis'
import BrandStory from '../sections/BrandStory'
import Lookbook from '../sections/Lookbook'
import Marquee from '../components/Marquee'
import { useDocumentTitle } from '../hooks/hooks'

export default function Home({ ready = true }) {
  useDocumentTitle('')
  return (
    <>
      <Hero ready={ready} />
      <div className="relative border-y border-white/15 py-4">
        <Marquee items={['MADE IN NIGERIA.', "DON'T BLEND IN.", 'PASSION FOR FASHION', 'MADE FOR MOVEMENT.']} />
      </div>
      <DropSection />
      <BreakOut />
      <NextDrop />
      <Genesis />
      <BrandStory />
      <Lookbook />
    </>
  )
}
