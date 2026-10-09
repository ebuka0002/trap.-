import { useState } from 'react'
import { img } from '../utils/images'

/** Responsive, lazy image with skeleton → fade-in. `name` is an asset key. */
export default function Img({ name, alt = '', className = '', pos, sizes = '100vw', priority = false, style, ...rest }) {
  const [loaded, setLoaded] = useState(false)
  const { src, srcSet } = img(name)
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : 'auto'}
      decoding="async"
      draggable={false}
      onLoad={() => setLoaded(true)}
      className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={{ objectPosition: pos, ...style }}
      {...rest}
    />
  )
}
