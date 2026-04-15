'use client'

import { experiences } from '@/lib/data'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Experience() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} id="experience">
      <div className="section-shell">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-label" data-reveal="">
              Timeline
            </div>
            <h2
              data-reveal=""
              data-reveal-delay="1"
              className="max-w-3xl text-balance text-[clamp(42px,6vw,80px)] font-bold leading-[0.96] tracking-[-0.05em]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              A path shaped by product, research, and shipping under pressure.
            </h2>
          </div>
          <p
            className="max-w-xl text-base leading-8 text-[rgba(245,239,229,0.62)]"
            data-reveal=""
            data-reveal-delay="2"
          >
            Each role pushed a different muscle: research, enterprise structure, client delivery, and product ownership.
          </p>
        </div>

        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <article
              key={`${experience.company}-${experience.role}`}
              className="panel surface-glow rounded-[32px] p-6 md:p-8"
              data-reveal=""
              data-reveal-delay={Math.min(index + 1, 4)}
            >
              <div className="grid gap-6 lg:grid-cols-[160px_minmax(0,1fr)_280px]">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[rgba(245,239,229,0.48)]">
                  <div>{experience.dateStart}</div>
                  <div className="mt-2 text-[rgba(245,239,229,0.3)]">{experience.dateEnd}</div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3
                      className="text-[34px] leading-none tracking-[-0.04em]"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {experience.company}
                    </h3>
                    <span className="rounded-full border border-[rgba(255,92,53,0.28)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                      {experience.role}
                    </span>
                  </div>
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(245,239,229,0.42)]">
                    {experience.location}
                  </div>
                  <p className="mt-5 max-w-3xl text-base leading-8 text-[rgba(245,239,229,0.68)]">
                    {experience.description}
                  </p>
                </div>

                <div className="rounded-[24px] border border-[rgba(245,239,229,0.1)] bg-[rgba(255,255,255,0.03)] p-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(245,239,229,0.42)]">
                    What changed
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[rgba(245,239,229,0.72)]">
                    {experience.impact}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {experience.focus.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[rgba(245,239,229,0.12)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
