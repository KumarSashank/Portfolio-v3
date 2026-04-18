'use client'

import { achievements, education } from '@/lib/data'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Achievements() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} id="achievements">
      <div className="section-shell grid lg:grid-cols-[minmax(0,1fr)_400px]" style={{ gap: 'clamp(80px, 8vw, 160px)' }}>
        <div>
          <div className="section-label" data-reveal="">
            Credentials
          </div>
          <h2
            data-reveal=""
            data-reveal-delay="1"
            className="mt-6 lg:mt-8 max-w-3xl text-balance text-[clamp(40px,6vw,78px)] font-bold leading-[0.96] tracking-[-0.05em]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Awards, education, and the academic backbone behind the experiments.
          </h2>

          <div className="grid md:grid-cols-2" style={{ marginTop: 'clamp(80px, 12vh, 160px)', gap: 'clamp(40px, 4vw, 80px)' }}>
            {achievements.map((item, index) => (
              <article
                key={item.text}
                className="group border-t border-[rgba(245,239,229,0.12)] pt-6 lg:pt-10 transition-colors hover:border-[rgba(245,239,229,0.3)]"
                data-reveal=""
                data-reveal-delay={Math.min(index * 0.15, 0.4)}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  {item.icon}
                </div>
                <p
                  className="mt-6 text-[28px] md:text-[32px] leading-[1.08] tracking-[-0.04em] text-paper transition-opacity group-hover:opacity-80"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="flex flex-col" style={{ gap: 'clamp(60px, 8vh, 100px)' }}>
          {education.map((item, index) => (
            <article
              key={item.school}
              className="group border-t border-[rgba(245,239,229,0.12)] pt-8 pb-4 transition-colors hover:border-[rgba(245,239,229,0.3)]"
              data-reveal=""
              data-reveal-delay={Math.min(index * 0.15, 0.4)}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(245,239,229,0.42)]">
                Education
              </div>
              <h3
                className="mt-6 text-[32px] leading-[1.02] tracking-[-0.04em] text-paper transition-opacity group-hover:opacity-80"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {item.school}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-[rgba(245,239,229,0.7)]">
                {item.degree}
              </p>
              <div className="mt-8 flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  {item.gpa}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {item.year}
                </span>
              </div>
            </article>
          ))}
        </aside>
      </div>
    </section>
  )
}
