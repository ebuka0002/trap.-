export default function Marquee({ items, className = '', outline = false }) {
  const row = [...items, ...items]
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden>
      <div className="animate-marquee flex w-max items-center whitespace-nowrap">
        {row.concat(row).map((t, i) => (
          <span key={i} className="flex items-center">
            <span className={`display px-6 text-[clamp(2.4rem,7vw,6rem)] ${outline && i % 2 ? 'outline-text-soft' : ''}`}>{t}</span>
            <span className="inline-block h-[0.6em] w-[0.6em] rotate-45 bg-gradient-to-br from-violet to-volt" />
          </span>
        ))}
      </div>
    </div>
  )
}
