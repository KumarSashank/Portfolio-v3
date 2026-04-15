'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { contactData, heroData } from '@/lib/data'
import CountUp from '@/components/ui/CountUp'
import CodeRain from '@/components/hero/CodeRain'
import KineticName from '@/components/hero/KineticName'
import SignalOrb from '@/components/hero/SignalOrb'
import StatusHUD from '@/components/hero/StatusHUD'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const sideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 1.35 })

      timeline
        .from(metaRef.current, { y: 24, opacity: 0, duration: 0.65 })
        .from(copyRef.current, { y: 36, opacity: 0, duration: 0.85 }, '-=0.2')
        .from(sideRef.current, { x: 36, opacity: 0, duration: 0.8 }, '-=0.55')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden px-0 pb-12 pt-28 md:pb-16 md:pt-36"
    >
      <SignalOrb />
      <CodeRain />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[55vh] bg-gradient-to-b from-[rgba(5,7,11,0.68)] via-transparent to-transparent" />
      <div className="pointer-events-none absolute left-[10%] top-[18%] h-40 w-40 rounded-full border border-[rgba(245,239,229,0.08)]" />
      <div className="pointer-events-none absolute right-[12%] top-[24%] h-56 w-56 rounded-full border border-[rgba(131,183,255,0.12)]" />

      <div className="section-shell relative z-[2]">
        <div
          ref={metaRef}
          className="mb-8 flex flex-wrap items-center gap-3 md:mb-10"
        >
          <span className="rounded-full border border-[rgba(255,92,53,0.3)] bg-[rgba(255,92,53,0.1)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(255,92,53,0.95)]">
            {heroData.eyebrow}
          </span>
          <span className="rounded-full border border-[rgba(245,239,229,0.12)] bg-[rgba(255,255,255,0.03)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(245,239,229,0.62)]">
            Seeking product, internship, and freelance collaborations
          </span>
        </div>

        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_420px] lg:gap-12">
          <div ref={copyRef}>
            <KineticName firstName={heroData.firstName} lastName={heroData.lastName} delay={1.35} />

            <div className="mt-6 max-w-4xl">
              <p className="max-w-2xl text-base leading-8 text-[rgba(245,239,229,0.72)] md:text-lg">
                {heroData.description}
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,92,53,0.35)] bg-accent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper no-underline transition-transform duration-200 hover:scale-[1.02]"
              >
                See selected work
              </a>
              <a
                href={`mailto:${contactData.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(245,239,229,0.14)] bg-[rgba(255,255,255,0.03)] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper no-underline transition-colors duration-200 hover:border-[rgba(131,183,255,0.3)] hover:text-sky"
              >
                Get in touch
              </a>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-[minmax(0,1fr)_300px]">
              <div className="panel rounded-[30px] p-7 md:p-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[rgba(245,239,229,0.46)]">
                  Why this portfolio exists
                </div>
                <p
                  className="mt-4 text-xl leading-[1.45] tracking-[-0.03em] text-[rgba(245,239,229,0.92)]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  To show that engineering depth and visual taste do not have to live in separate worlds.
                </p>
                <p className="mt-4 text-sm leading-7 text-[rgba(245,239,229,0.62)]">
                  I like building interfaces that make technical work feel legible, tactile, and worth exploring.
                </p>
              </div>

              <div className="panel rounded-[30px] p-7 md:p-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[rgba(245,239,229,0.46)]">
                  Current signal
                </div>
                <p className="mt-4 text-sm leading-7 text-[rgba(245,239,229,0.72)]">
                  {heroData.availability}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {heroData.disciplines.map((discipline) => (
                    <span
                      key={discipline}
                      className="rounded-full border border-[rgba(245,239,229,0.14)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(245,239,229,0.68)]"
                    >
                      {discipline}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-3">
              {heroData.stats.map((stat) => (
                <div key={stat.label} className="panel-soft rounded-[24px] p-5">
                  <div
                    className="text-[40px] font-bold leading-none tracking-[-0.05em]"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    <CountUp end={parseInt(stat.value, 10)} duration={1.4} />
                    <span className="ml-1 text-accent">{stat.suffix}</span>
                  </div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={sideRef} className="relative lg:pb-4">
            <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_top,rgba(131,183,255,0.16),transparent_55%)] blur-2xl" />
            <div className="panel surface-glow relative rounded-[34px] p-6 md:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[rgba(245,239,229,0.42)]">
                    Mission control
                  </div>
                  <div
                    className="mt-2 text-[30px] font-bold leading-none tracking-[-0.04em]"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    Building with range.
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full border border-[rgba(245,239,229,0.12)] bg-[radial-gradient(circle_at_center,rgba(255,92,53,0.28),transparent_70%)]" />
              </div>

              <div className="mt-6 space-y-4">
                {heroData.callouts.map((item, index) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-[rgba(245,239,229,0.1)] bg-[rgba(255,255,255,0.03)] p-5"
                    style={{
                      transform: `translateX(${index % 2 === 0 ? 0 : 8}px)`,
                    }}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(245,239,229,0.42)]">
                      {item.label}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[rgba(245,239,229,0.76)]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[24px] border border-[rgba(245,239,229,0.1)] bg-[linear-gradient(135deg,rgba(255,92,53,0.12),rgba(131,183,255,0.08))] p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(245,239,229,0.5)]">
                  Preferred collaboration zone
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[18px] bg-[rgba(5,7,11,0.34)] p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                      Product
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[rgba(245,239,229,0.72)]">
                      Dashboards, AI flows, growth surfaces, and systemized UX.
                    </p>
                  </div>
                  <div className="rounded-[18px] bg-[rgba(5,7,11,0.34)] p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-sky">
                      Storytelling
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[rgba(245,239,229,0.72)]">
                      Launch pages, portfolios, case studies, and interactive narratives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StatusHUD />
    </section>
  )
}
