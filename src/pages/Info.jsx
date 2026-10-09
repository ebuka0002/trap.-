import { Navigate, useParams } from 'react-router-dom'
import { POLICIES, SITE } from '../data/siteData'
import { useDocumentTitle } from '../hooks/hooks'
import Button from '../components/Button'

export default function Info() {
  const { slug } = useParams()
  const page = POLICIES[slug]
  useDocumentTitle(page?.title)
  if (!page) return <Navigate to="/404" replace />
  return (
    <div className="container-x pt-32 md:pt-44">
      <h1 className="display text-[clamp(4.5rem,17vw,15rem)]">{page.title}</h1>
      <div className="mt-10 max-w-[56ch] space-y-5 text-lg leading-relaxed text-bone/85">{page.body.map((b, i) => <p key={i}>{b}</p>)}</div>
      {slug === 'contact' && (
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" arrow>WHATSAPP</Button>
          <Button href={SITE.instagram} target="_blank" rel="noreferrer" variant="ghost" arrow>INSTAGRAM</Button>
          <Button href={`mailto:${SITE.email}`} variant="ghost" arrow>EMAIL</Button>
        </div>
      )}
    </div>
  )
}
