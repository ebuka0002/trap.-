import Button from '../components/Button'
import { useDocumentTitle } from '../hooks/hooks'

export default function NotFound() {
  useDocumentTitle('Lost')
  return (
    <div className="container-x grid min-h-[80svh] place-content-center pt-24">
      <p className="label">ERROR 404</p>
      <h1 className="display text-[clamp(5rem,20vw,18rem)]">OFF<br /><span className="outline-text">ROUTE.</span></h1>
      <p className="mt-4 max-w-[30ch] text-mist">That page doesn't exist. Break out of here.</p>
      <div className="mt-8"><Button to="/" arrow>BACK HOME</Button></div>
    </div>
  )
}
