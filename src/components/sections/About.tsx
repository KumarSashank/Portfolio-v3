'use client'

import { aboutData, operatingPrinciples } from '@/lib/data'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function About() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} id="about">
      <div className="section-shell grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div>
          <div className="section-label" data-reveal="">
            Craft
          </div>
          <h2
            data-reveal=""
            data-reveal-delay="1"
            className="max-w-3xl text-balance text-[clamp(42px,6vw,84px)] font-bold leading-[0.96] tracking-[-0.05em]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Building work that feels
            <span className="text-gold"> authored</span>, not assembled.
          </h2>
          <p
            className="mt-7 max-w-2xl text-lg leading-8 text-[rgba(245,239,229,0.72)]"
            data-reveal=""
            data-reveal-delay="2"
          >
            {aboutData.intro}
          </p>
          <p
            className="mt-5 max-w-2xl text-base leading-8 text-[rgba(245,239,229,0.62)]"
            data-reveal=""
            data-reveal-delay="3"
          >
            {aboutData.text}
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {operatingPrinciples.map((principle, index) => (
              <article
                key={principle.id}
                className="panel-soft surface-glow rounded-[28px] p-6 md:p-7"
                data-reveal=""
                data-reveal-delay={Math.min(index + 2, 4)}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  {principle.id}
                </div>
                <h3
                  className="mt-4 text-[28px] leading-tight tracking-[-0.03em]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[rgba(245,239,229,0.66)]">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {aboutData.pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className="panel rounded-[30px] p-7 md:p-9"
              data-reveal=""
              data-reveal-delay={Math.min(index + 1, 3)}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(245,239,229,0.42)]">
                Pillar {String(index + 1).padStart(2, '0')}
              </div>
              <h3
                className="mt-5 text-[34px] leading-[1.02] tracking-[-0.04em]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {pillar.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[rgba(245,239,229,0.68)]">
                {pillar.description}
              </p>
            </article>
          ))}

          <div className="panel rounded-[30px] p-7 md:p-9" data-reveal="" data-reveal-delay="4">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(245,239,229,0.42)]">
              Capability map
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {aboutData.skills.map((skill) => (
                <div
                  key={skill.category}
                  className="rounded-[22px] border border-[rgba(245,239,229,0.1)] bg-[rgba(255,255,255,0.02)] p-4"
                >
                  <div className="text-sm font-semibold text-paper">{skill.category}</div>
                  <div className="mt-2 font-mono text-[11px] leading-6 text-muted">
                    {skill.items}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
