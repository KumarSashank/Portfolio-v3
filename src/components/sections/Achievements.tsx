'use client'

import { achievements, education } from '@/lib/data'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Achievements() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} id="achievements">
      <div className="section-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="section-label" data-reveal="">
            Credentials
          </div>
          <h2
            data-reveal=""
            data-reveal-delay="1"
            className="max-w-3xl text-balance text-[clamp(40px,6vw,78px)] font-bold leading-[0.96] tracking-[-0.05em]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Awards, education, and the academic backbone behind the experiments.
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {achievements.map((item, index) => (
              <article
                key={item.text}
                className="panel-soft rounded-[26px] p-6 md:p-7"
                data-reveal=""
                data-reveal-delay={Math.min(index + 1, 4)}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  {item.icon}
                </div>
                <p
                  className="mt-4 text-[26px] leading-[1.08] tracking-[-0.04em]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          {education.map((item, index) => (
            <article
              key={item.school}
              className="panel rounded-[28px] p-6"
              data-reveal=""
              data-reveal-delay={Math.min(index + 1, 3)}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(245,239,229,0.42)]">
                Education
              </div>
              <h3
                className="mt-4 text-[30px] leading-[1.02] tracking-[-0.04em]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {item.school}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[rgba(245,239,229,0.7)]">
                {item.degree}
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-[rgba(245,239,229,0.1)] pt-4">
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
