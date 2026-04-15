'use client'

import { marqueeItems } from '@/lib/constants'

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <div className="overflow-hidden border-y border-[rgba(245,239,229,0.08)] bg-[rgba(255,255,255,0.02)] py-5">
      <div className="section-shell mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[rgba(245,239,229,0.42)]">
        Working across
      </div>
      <div
        className="flex w-max gap-0"
        style={{ animation: 'marquee 28s linear infinite' }}
      >
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="whitespace-nowrap px-8 font-mono text-[12px] uppercase tracking-[0.18em] text-[rgba(245,239,229,0.74)]"
          >
            {item}
            <span className="mx-3 text-accent">/</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
