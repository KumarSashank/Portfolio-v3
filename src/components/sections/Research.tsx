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
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-label text-accent before:bg-[rgba(255,92,53,0.45)]" data-reveal="">
              Proof
            </div>
            <h2
              data-reveal=""
              data-reveal-delay="1"
              className="max-w-4xl text-balance text-[clamp(42px,6vw,82px)] font-bold leading-[0.95] tracking-[-0.05em] text-ink"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Research-driven thinking, shipped outcomes, and real-world momentum.
            </h2>
          </div>
          <p
            className="max-w-xl text-base leading-8 text-[rgba(5,7,11,0.66)]"
            data-reveal=""
            data-reveal-delay="2"
          >
            I want the portfolio to feel expressive, but I also want it to feel grounded. These are the signals behind the visuals.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {proofMetrics.map((metric, index) => (
            <article
              key={metric.label}
              className="rounded-[28px] border border-[rgba(5,7,11,0.08)] bg-[rgba(5,7,11,0.03)] p-6"
              data-reveal=""
              data-reveal-delay={Math.min(index + 1, 3)}
            >
              <div
                className="text-[52px] leading-none tracking-[-0.05em] text-ink"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {metric.value}
              </div>
              <p className="mt-3 text-sm leading-7 text-[rgba(5,7,11,0.62)]">{metric.label}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {research.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[30px] border border-[rgba(5,7,11,0.08)] bg-white p-6 shadow-[0_20px_80px_rgba(5,7,11,0.07)]"
              data-reveal=""
              data-reveal-delay={Math.min(index + 1, 3)}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(5,7,11,0.45)]">
                  {item.date}
                </span>
                <span className="rounded-full border border-[rgba(255,92,53,0.2)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  {item.status}
                </span>
              </div>

              <h3
                className="mt-6 text-[32px] leading-[1.02] tracking-[-0.04em] text-ink"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[rgba(5,7,11,0.68)]">{item.description}</p>

              <div className="mt-7">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,92,53,0.24)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent no-underline transition-colors hover:bg-[rgba(255,92,53,0.08)]"
                  >
                    {item.linkLabel}
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
