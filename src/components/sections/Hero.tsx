'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { contactData, heroData } from '@/lib/data'
import CountUp from '@/components/ui/CountUp'
import KineticName from '@/components/hero/KineticName'
import SvgConnections from '@/components/hero/SvgConnections'
import { T, Ease, Dist } from '@/lib/motion/tokens'
import { useMotionPrefs } from '@/lib/motion/prefs'

/**
 * HERO — Editorial layout.
 *
 * Design model: magazine/publication, not webpage.
 *   - Masthead strip (section marker + availability)
 *   - Name as the full stage (no competing illustration)
 *   - Pull-quote statement in big serif (not small body copy)
 *   - Asymmetric 7/4 grid: statement (wider) + spec sheet (narrower, credits-style)
 *   - Ticker strip at the bottom — stats + scroll cue
 *
 * Atmosphere: ONE layer only (SvgConnections). Illustration removed
 * intentionally so the name owns the visual weight.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const specRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { reducedMotion } = useMotionPrefs()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = [topRef.current, copyRef.current, specRef.current, bottomRef.current]

      if (reducedMotion) {
        gsap.set(targets, { y: 0, opacity: 1 })
        return
      }

      const tl = gsap.timeline({ delay: 1.1 })
      tl.from(topRef.current, { y: 12, opacity: 0, duration: T.base, ease: Ease.outSoft })
        .from(copyRef.current, { y: Dist.text, opacity: 0, duration: T.grand, ease: Ease.outSnap }, '+=0.9')
        .from(specRef.current, { y: Dist.text, opacity: 0, duration: T.grand, ease: Ease.outSnap }, '<0.1')
        .from(bottomRef.current, { y: Dist.text, opacity: 0, duration: T.grand, ease: Ease.outSnap }, '<0.15')
    }, sectionRef)
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{
        paddingTop: 'clamp(120px, 15vh, 170px)',
        paddingBottom: 'clamp(40px, 5vh, 64px)',
      }}
    >
      {/* One atmospheric layer — no illustration, no competing elements */}
      <SvgConnections />

      {/* Depth gradients for readability over the atmosphere */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-[rgba(5,7,11,0.72)] via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28vh] bg-gradient-to-t from-[rgba(5,7,11,0.55)] via-transparent to-transparent" />

      <div
        className="section-shell relative z-[2] flex flex-col"
        style={{ minHeight: 'calc(100vh - clamp(120px, 15vh, 170px) - clamp(40px, 5vh, 64px))' }}
      >
        {/* ─────────── MASTHEAD ─────────── */}
        <div
          ref={topRef}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(245,239,229,0.08)] pb-5"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-[rgba(245,239,229,0.4)]">
            — 01 &nbsp;&nbsp; Kumar Sashank &nbsp; · &nbsp; Portfolio &nbsp; · &nbsp; 2026
          </div>
          <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[rgba(245,239,229,0.6)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {heroData.eyebrow}
          </div>
        </div>

        {/* ─────────── THE NAME — full stage ─────────── */}
        <div ref={nameRef} className="mt-12 md:mt-24">
          <KineticName firstName={heroData.firstName} lastName={heroData.lastName} delay={1.1} />
        </div>

        {/* ─────────── BODY — 7/4 asymmetric editorial grid ─────────── */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-10" style={{ marginTop: 'min(100px, 12vh)' }}>
          {/* Pull-quote statement (wider) */}
          <div ref={copyRef} className="md:col-span-7">
            <p
              className="max-w-2xl text-balance text-[22px] font-medium leading-[1.35] tracking-[-0.02em] text-paper md:text-[26px]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {heroData.description}
            </p>
            <div className="flex flex-wrap gap-5" style={{ marginTop: '60px' }}>
              <a
                href="#projects"
                data-magnetic
                data-cursor="View Work"
                className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper no-underline transition-all duration-200 hover:gap-4"
              >
                See selected work
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href={`mailto:${contactData.email}`}
                data-magnetic
                data-cursor="✉ Email"
                className="inline-flex items-center rounded-full border border-[rgba(245,239,229,0.18)] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper no-underline transition-colors duration-200 hover:border-paper"
              >
                Get in touch
              </a>
            </div>
          </div>

          {/* Spec sheet — editorial credits style */}
          <aside
            ref={specRef}
            className="flex flex-col justify-end md:col-span-4 md:col-start-9"
          >
            <div className="space-y-4 border-l border-[rgba(245,239,229,0.15)] pl-5">
              <SpecLine label="Role" value={heroData.role} />
              <SpecLine label="Focus" value="AI · Product · Infra" />
              <SpecLine label="Based in" value="Ontario, Canada" />
              <SpecLine label="Available" value="Q2 2026" accent />
            </div>
          </aside>
        </div>

        {/* ─────────── TICKER FOOT — stats + scroll cue ─────────── */}
        <div
          ref={bottomRef}
          className="flex flex-wrap items-center justify-between gap-6 border-t border-[rgba(245,239,229,0.1)]"
          style={{ marginTop: 'auto', paddingTop: '1.75rem' }}
        >
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            {heroData.stats.map((stat, i) => (
              <span key={stat.label} className="flex items-baseline gap-2.5">
                <span
                  className="text-[26px] font-bold leading-none tracking-[-0.02em] text-paper md:text-[30px]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  <CountUp end={parseInt(stat.value, 10)} duration={1.4} />
                  <span className="text-accent">{stat.suffix}</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[rgba(245,239,229,0.5)]">
                  {stat.label}
                </span>
                {i < heroData.stats.length - 1 && (
                  <span className="ml-4 hidden text-[rgba(245,239,229,0.2)] md:inline">/</span>
                )}
              </span>
            ))}
          </div>

          <a
            href="#craft"
            className="group hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[rgba(245,239,229,0.4)] no-underline transition-colors duration-200 hover:text-paper md:inline-flex"
          >
            <span>Scroll</span>
            <span className="h-px w-10 bg-current transition-all duration-300 group-hover:w-16" />
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 2V10M6 10L2.5 6.5M6 10L9.5 6.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

/**
 * Editorial credits-style line — label on the left (muted mono),
 * value flush right (paper or accent). The visual rhythm mimics
 * film end-credits or a magazine masthead.
 */
function SpecLine({
  label,
  value,
  accent = false,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.24em] text-[rgba(245,239,229,0.4)]">
        {label}
      </span>
      <span
        className={`text-right text-[14px] leading-tight ${
          accent ? 'text-accent' : 'text-[rgba(245,239,229,0.88)]'
        }`}
      >
        {value}
      </span>
    </div>
  )
}
