'use client'

import { proofMetrics, research } from '@/lib/data'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Research() {
  const sectionRef = useScrollReveal()

  return (
    <section
      ref={sectionRef}
      id="research"
      className="bg-paper text-ink"
    >
      <div className="section-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between" style={{ marginBottom: 'clamp(80px, 12vh, 160px)' }}>
          <div>
            <div className="section-label text-accent before:bg-[rgba(255,92,53,0.45)]" data-reveal="">
              Proof
            </div>
            <h2
              data-reveal=""
              data-reveal-delay="1"
              className="mt-6 lg:mt-8 max-w-4xl text-balance text-[clamp(42px,6vw,82px)] font-bold leading-[0.95] tracking-[-0.05em] text-ink"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Research-driven thinking, shipped outcomes, and real-world momentum.
            </h2>
          </div>
          <p
            className="max-w-md text-base leading-8 text-[rgba(5,7,11,0.66)] mb-2 lg:mb-4"
            data-reveal=""
            data-reveal-delay="2"
          >
            I want the portfolio to feel expressive, but I also want it to feel grounded. These are the signals behind the visuals.
          </p>
        </div>

        <div className="grid md:grid-cols-3" style={{ marginBottom: 'clamp(100px, 15vh, 200px)', gap: 'clamp(40px, 4vw, 80px)' }}>
          {proofMetrics.map((metric, index) => (
            <article
              key={metric.label}
              className="border-t border-[rgba(5,7,11,0.12)] pt-6 lg:pt-10 transition-colors hover:border-[rgba(5,7,11,0.3)]"
              data-reveal=""
              data-reveal-delay={Math.min(index * 0.15, 0.4)}
            >
              <div
                className="text-[64px] lg:text-[80px] leading-none tracking-[-0.05em] text-ink"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {metric.value}
              </div>
              <p className="mt-4 text-[16px] leading-[1.6] text-[rgba(5,7,11,0.62)]">{metric.label}</p>
            </article>
          ))}
        </div>

        <div className="grid lg:grid-cols-3" style={{ gap: 'clamp(40px, 4vw, 80px)' }}>
          {research.map((item, index) => (
            <article
              key={item.title}
              className="group border-t border-[rgba(5,7,11,0.12)] pt-8 pb-4 transition-colors hover:border-[rgba(5,7,11,0.3)]"
              data-reveal=""
              data-reveal-delay={Math.min(index * 0.15, 0.4)}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(5,7,11,0.45)]">
                  {item.date}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  {item.status}
                </span>
              </div>

              <h3
                className="mt-6 text-[28px] md:text-[34px] leading-[1.05] tracking-[-0.04em] text-ink transition-opacity group-hover:opacity-80"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {item.title}
              </h3>
              <p className="mt-5 text-[15px] leading-[1.7] text-[rgba(5,7,11,0.68)]">{item.description}</p>

              <div className="mt-8">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent no-underline transition-all hover:text-ink hover:gap-3"
                  >
                    {item.linkLabel}
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ) : (
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(5,7,11,0.42)]">
                    {item.linkLabel}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
