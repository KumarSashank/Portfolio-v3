'use client'

import { experiences } from '@/lib/data'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Experience() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} id="experience">
      <div className="section-shell">
        <div className="mb-24 lg:mb-32 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between" style={{ marginBottom: 'clamp(80px, 10vh, 140px)' }}>
          <div>
            <div className="section-label" data-reveal="">
              Timeline
            </div>
            <h2
              data-reveal=""
              data-reveal-delay="1"
              className="mt-6 lg:mt-8 max-w-4xl text-balance text-[clamp(42px,6vw,80px)] font-bold leading-[0.96] tracking-[-0.05em]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              A path shaped by product, research, and shipping under pressure.
            </h2>
          </div>
          <p
            className="max-w-md text-base leading-8 text-[rgba(245,239,229,0.62)] mb-2 lg:mb-4"
            data-reveal=""
            data-reveal-delay="2"
          >
            Each role pushed a different muscle: research, enterprise structure, client delivery, and product ownership.
          </p>
        </div>

        <div className="border-t border-[rgba(245,239,229,0.12)]">
          {experiences.map((experience, index) => (
            <article
              key={`${experience.company}-${experience.role}`}
              className="group border-b border-[rgba(245,239,229,0.12)] transition-colors duration-500 hover:bg-[rgba(245,239,229,0.015)]"
              style={{ paddingTop: 'clamp(60px, 8vh, 100px)', paddingBottom: 'clamp(60px, 8vh, 100px)' }}
              data-reveal=""
              data-reveal-delay={Math.min(index * 0.15, 0.4)}
            >
              <div className="grid gap-12 lg:grid-cols-[140px_1fr_340px] px-4 md:px-8" style={{ gap: 'clamp(40px, 5vw, 80px)' }}>
                
                {/* ── Left Column: Context ── */}
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[rgba(245,239,229,0.48)] shrink-0 pt-3">
                  <div className="flex gap-3 items-center lg:block">
                    <span>{experience.dateStart}</span>
                    <span className="lg:hidden">—</span>
                    <span className="lg:mt-3 text-[rgba(245,239,229,0.3)] block">{experience.dateEnd}</span>
                  </div>
                </div>

                {/* ── Middle Column: Role ── */}
                <div>
                  <h3
                    className="text-[40px] md:text-[56px] leading-[1] tracking-[-0.03em] text-paper transition-colors duration-300 group-hover:text-[rgba(255,255,255,0.9)]"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {experience.company}
                  </h3>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[rgba(255,92,53,0.9)] font-medium">
                      {experience.role}
                    </span>
                    <span className="text-[rgba(245,239,229,0.15)] text-[10px] hidden sm:inline-block">/</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(245,239,229,0.42)]">
                      {experience.location}
                    </span>
                  </div>
                  <p className="mt-8 max-w-2xl text-[16px] leading-[1.8] text-[rgba(245,239,229,0.68)] md:text-[17px]">
                    {experience.description}
                  </p>
                </div>

                {/* ── Right Column: Impact & Specs ── */}
                <div className="pt-6 lg:pt-2 border-t border-[rgba(245,239,229,0.06)] lg:border-t-0 mt-2 lg:mt-0">
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] w-6 bg-[rgba(245,239,229,0.15)] transition-all duration-300 group-hover:w-10 group-hover:bg-[rgba(255,92,53,0.4)]"></div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(245,239,229,0.42)] group-hover:text-[rgba(245,239,229,0.6)] transition-colors duration-300">
                      Impact
                    </div>
                  </div>
                  <p className="mt-5 text-[14px] leading-[1.8] text-[rgba(245,239,229,0.72)] lg:pr-4">
                    {experience.impact}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {experience.focus.map((item) => (
                      <span
                        key={item}
                        className="rounded-[4px] border border-[rgba(245,239,229,0.08)] bg-[rgba(245,239,229,0.015)] px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-[rgba(245,239,229,0.5)] transition-all duration-300 group-hover:border-[rgba(245,239,229,0.2)] group-hover:bg-[rgba(245,239,229,0.04)] group-hover:text-[rgba(245,239,229,0.85)]"
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
