'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { contactData, heroData } from '@/lib/data'
import CountUp from '@/components/ui/CountUp'
import KineticName from '@/components/hero/KineticName'
import SvgConnections from '@/components/hero/SvgConnections'
import IllustratedWorkspace from '@/components/hero/IllustratedWorkspace'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.2 })
      tl.from(topRef.current, { y: 15, opacity: 0, duration: 0.8, ease: 'power2.out' })
        .from(copyRef.current, { y: 25, opacity: 0, duration: 0.8, ease: 'power3.out' }, '+=0.6')
        .from(metaRef.current, { y: 25, opacity: 0, duration: 0.8, ease: 'power3.out' }, '<0.1')
        .from(bottomRef.current, { y: 25, opacity: 0, duration: 0.8, ease: 'power3.out' }, '<0.1')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{
        paddingTop: 'clamp(110px, 14vh, 160px)',
        paddingBottom: 'clamp(40px, 5vh, 64px)',
      }}
    >
      <SvgConnections />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[55vh] bg-gradient-to-b from-[rgba(5,7,11,0.75)] via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-[rgba(5,7,11,0.55)] via-transparent to-transparent" />

      <div
        className="section-shell relative z-[2] flex flex-col"
        style={{ minHeight: 'calc(100vh - clamp(110px, 14vh, 160px) - clamp(40px, 5vh, 64px))' }}
      >
        {/* ── Top row: eyebrow + live availability ── */}
        <div ref={topRef} className="flex flex-wrap items-center justify-between gap-4">
          <span className="rounded-full border border-[rgba(255,92,53,0.3)] bg-[rgba(255,92,53,0.1)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(255,92,53,0.95)]">
            {heroData.eyebrow}
          </span>
          <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[rgba(245,239,229,0.55)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Accepting new projects
          </div>
        </div>

        {/* ── Main Body: 2 Column Layout ── */}
        <div className="mt-8 md:mt-12 flex-1 flex flex-col lg:flex-row items-center w-full gap-10">
          
          {/* Left Column: Typography */}
          <div className="w-full lg:w-3/5 flex flex-col justify-center">
            {/* ── Name: hero moment ── */}
            <div ref={nameRef}>
              <KineticName firstName={heroData.firstName} lastName={heroData.lastName} delay={1.2} />
            </div>

        {/* ── Description & CTAs ── */}
        <div ref={copyRef} className="mt-8 md:mt-12 max-w-xl">
          <p className="text-base leading-[1.8] text-[rgba(245,239,229,0.68)] md:text-[17px]">
            {heroData.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,92,53,0.35)] bg-accent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-paper no-underline transition-opacity duration-200 hover:opacity-85"
            >
              See selected work
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href={`mailto:${contactData.email}`}
              className="inline-flex items-center rounded-full border border-[rgba(245,239,229,0.14)] bg-[rgba(255,255,255,0.03)] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-paper no-underline transition-colors duration-200 hover:border-[rgba(245,239,229,0.3)]"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div> {/* End Left Column */}

      {/* Right Column: Illustration */}
      <div className="hidden lg:flex w-full lg:w-2/5 justify-end relative">
        <IllustratedWorkspace />
      </div>

    </div> {/* End Main Body Layout */}

        {/* ── Bottom: stats + scroll cue ── */}
        <div
          ref={bottomRef}
          className="mt-auto flex flex-wrap items-end justify-between gap-10 border-t border-[rgba(245,239,229,0.1)] pt-8"
          style={{ marginTop: 'auto', paddingTop: '2rem' }}
        >
          <div className="flex flex-wrap items-start gap-10 md:gap-14">
            {heroData.stats.map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-[42px] font-bold leading-none tracking-[-0.04em] md:text-[48px]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  <CountUp end={parseInt(stat.value, 10)} duration={1.4} />
                  <span className="text-accent">{stat.suffix}</span>
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <a
            href="#craft"
            className="group hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[rgba(245,239,229,0.45)] no-underline transition-colors duration-200 hover:text-paper md:inline-flex"
          >
            <span>Scroll</span>
            <span className="h-px w-10 bg-[rgba(245,239,229,0.3)] transition-all duration-300 group-hover:w-14 group-hover:bg-paper" />
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M6 2V10M6 10L2.5 6.5M6 10L9.5 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

