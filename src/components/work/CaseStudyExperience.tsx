'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import type { CaseStudy } from '@/lib/case-studies'
import MagneticButton from '@/components/ui/MagneticButton'

export default function CaseStudyExperience({ study }: { study: CaseStudy }) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const elements = sectionRef.current.querySelectorAll('[data-reveal]')
    elements.forEach((element) => {
      gsap.set(element, { opacity: 0, y: 40 })
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const element = entry.target as HTMLElement
          const delay = parseFloat(element.dataset.revealDelay || '0') * 0.1

          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay,
            ease: 'power3.out',
            overwrite: true,
          })

          observer.unobserve(element)
        })
      },
      { threshold: 0.05 }
    )

    requestAnimationFrame(() => {
      elements.forEach((element) => observer.observe(element))
    })

    return () => observer.disconnect()
  }, [study.slug])

  return (
    <div ref={sectionRef}>
      <nav className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-6">
        <div className="section-shell panel flex items-center justify-between rounded-full px-5 py-3">
          <Link
            href="/#projects"
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-paper no-underline transition-colors hover:text-accent"
          >
            &larr; Back to work
          </Link>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            {study.num} / 03
          </span>
        </div>
      </nav>

      <section className="relative flex min-h-[70vh] flex-col justify-end">
        <div className="mb-4 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent" data-reveal="">
          <span className="text-[rgba(255,59,0,0.35)]">{study.num}</span>
          Case Study
        </div>
        <h1
          data-reveal=""
          data-reveal-delay="1"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(48px, 7vw, 100px)',
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: '-0.035em',
          }}
        >
          {study.title}
        </h1>
        <p
          className="mt-6 max-w-[600px] text-[18px] leading-[1.7] text-[rgba(244,240,232,0.6)]"
          data-reveal=""
          data-reveal-delay="2"
        >
          {study.subtitle}
        </p>

        <div
          className="mt-12 grid grid-cols-2 gap-8 border-t border-[rgba(244,240,232,0.1)] pt-8 md:grid-cols-4"
          data-reveal=""
          data-reveal-delay="3"
        >
          <MetaItem label="Role" value={study.role} />
          <MetaItem label="Timeline" value={study.timeline} />
          <MetaItem label="Team" value={study.team} />
          <div>
            <div className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-muted">Stack</div>
            <div className="flex flex-wrap gap-1.5">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-[rgba(244,240,232,0.15)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-0">
        <CaseStudyCover slug={study.slug} />
      </section>

      <section>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
          <div>
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent" data-reveal="">
              Overview
            </div>
          </div>
          <div>
            <p className="text-[18px] leading-[1.8] text-[rgba(244,240,232,0.75)]" data-reveal="">
              {study.overview}
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: 'rgba(244,240,232,0.025)' }}>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
          <div>
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-accent" data-reveal="">
              The Problem
            </div>
            <p className="text-[16px] leading-[1.8] text-[rgba(244,240,232,0.7)]" data-reveal="" data-reveal-delay="1">
              {study.problem}
            </p>
          </div>
          <div>
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-accent" data-reveal="">
              The Solution
            </div>
            <p className="text-[16px] leading-[1.8] text-[rgba(244,240,232,0.7)]" data-reveal="" data-reveal-delay="1">
              {study.solution}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-accent" data-reveal="">
          Process
        </div>
        <h2
          className="mb-16 font-bold leading-[1.03] tracking-tight"
          data-reveal=""
          data-reveal-delay="1"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(32px, 4vw, 56px)',
            letterSpacing: '-0.03em',
          }}
        >
          How it was built.
        </h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {study.process.map((step, index) => (
            <div
              key={step.title}
              className="border-t border-[rgba(244,240,232,0.15)] pt-8"
              data-reveal=""
              data-reveal-delay={Math.min(index + 1, 3)}
            >
              <div className="mb-4 font-mono text-[42px] font-bold text-[rgba(255,59,0,0.15)]" style={{ fontFamily: 'var(--font-serif)' }}>
                0{index + 1}
              </div>
              <div
                className="mb-3 text-[20px] font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em' }}
              >
                {step.title}
              </div>
              <p className="text-[14px] leading-[1.8] text-[rgba(244,240,232,0.65)]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'rgba(244,240,232,0.025)' }}>
        <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-accent" data-reveal="">
          Results
        </div>
        <h2
          className="mb-12 font-bold leading-[1.03] tracking-tight"
          data-reveal=""
          data-reveal-delay="1"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(32px, 4vw, 56px)',
            letterSpacing: '-0.03em',
          }}
        >
          What was achieved.
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {study.results.map((result, index) => (
            <div
              key={result}
              className="flex items-start gap-4 border border-[rgba(244,240,232,0.1)] p-6"
              data-reveal=""
              data-reveal-delay={Math.min(index + 1, 3)}
              style={{ background: 'var(--glass)' }}
            >
              <span className="mt-0.5 text-[18px] text-accent">&#10003;</span>
              <span className="text-[16px] leading-[1.6]">{result}</span>
            </div>
          ))}
        </div>
      </section>

      {study.nextProject && (
        <section className="text-center" style={{ borderTop: '1px solid rgba(244,240,232,0.1)' }}>
          <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted" data-reveal="">
            Next Project
          </div>
          <Link href={`/work/${study.nextProject.slug}`} className="group no-underline">
            <h3
              className="font-bold tracking-tight transition-colors group-hover:text-accent"
              data-reveal=""
              data-reveal-delay="1"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(40px, 6vw, 80px)',
                letterSpacing: '-0.03em',
                color: 'var(--paper)',
              }}
            >
              {study.nextProject.title}
            </h3>
          </Link>
          <MagneticButton>
            <Link
              href={`/work/${study.nextProject.slug}`}
              className="mt-6 inline-block border border-accent px-8 py-3.5 font-mono text-[12px] uppercase tracking-[0.12em] text-accent no-underline transition-all hover:bg-accent hover:text-paper"
              data-reveal=""
              data-reveal-delay="2"
            >
              View Case Study &rarr;
            </Link>
          </MagneticButton>
        </section>
      )}
    </div>
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-muted">{label}</div>
      <div className="text-[14px]">{value}</div>
    </div>
  )
}

function CaseStudyCover({ slug }: { slug: string }) {
  const isExam = slug === 'ai-exam-portal'
  const isIcho = slug === 'icho'

  return (
    <div className="panel relative mx-12 aspect-[16/9] overflow-hidden rounded-[34px] max-md:mx-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,92,53,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(131,183,255,0.12),transparent_30%)]" />

      {isExam && (
        <>
          <div className="absolute inset-10 rounded-[30px] border border-[rgba(245,239,229,0.1)] bg-[rgba(10,14,22,0.86)]" />
          <div className="absolute left-16 top-16 h-3 w-28 rounded-full bg-[rgba(245,239,229,0.08)]" />
          <div className="absolute left-16 top-28 h-[46%] w-[48%] rounded-[24px] border border-[rgba(245,239,229,0.08)] bg-[rgba(255,255,255,0.03)]" />
          <div className="absolute right-16 top-28 flex w-[26%] flex-col gap-5">
            {[64, 82, 52].map((width) => (
              <div key={width} className="rounded-[20px] border border-[rgba(245,239,229,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
                <div className="mb-3 h-2 w-16 rounded-full bg-[rgba(245,239,229,0.08)]" />
                <div className="h-2 rounded-full bg-[rgba(245,239,229,0.08)]">
                  <div className="h-full rounded-full bg-sky" style={{ width: `${width}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-12 left-16 right-16 grid grid-cols-3 gap-4">
            {['Question generation', 'AI grading', 'Realtime analytics'].map((item) => (
              <div key={item} className="rounded-[18px] border border-[rgba(245,239,229,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[rgba(245,239,229,0.56)]">
                {item}
              </div>
            ))}
          </div>
        </>
      )}

      {isIcho && (
        <>
          <div className="absolute inset-12 rounded-full border border-[rgba(245,239,229,0.08)]" />
          <div className="absolute inset-[96px] rounded-full border border-[rgba(245,239,229,0.12)]" />
          <div className="absolute inset-[160px] rounded-full border border-[rgba(245,239,229,0.14)]" />
          <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(245,239,229,0.14)] bg-[rgba(255,255,255,0.04)] shadow-[0_0_80px_rgba(211,178,108,0.26)]" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(245,239,229,0.16),transparent)]" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-[linear-gradient(90deg,transparent,rgba(245,239,229,0.16),transparent)]" />
          <div className="absolute bottom-10 left-10 right-10 grid grid-cols-3 gap-4">
            {['Pitch', 'Yaw', 'Roll'].map((item, index) => (
              <div key={item} className="rounded-[18px] border border-[rgba(245,239,229,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[rgba(245,239,229,0.5)]">{item}</div>
                <div className="mt-3 h-1.5 rounded-full bg-[rgba(245,239,229,0.08)]">
                  <div className="h-full rounded-full bg-gold" style={{ width: `${56 + index * 12}%` }} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!isExam && !isIcho && (
        <>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 675" fill="none" aria-hidden>
            <path d="M240 190L900 150" stroke="rgba(245,239,229,0.22)" strokeDasharray="8 12" />
            <path d="M240 190L400 500" stroke="rgba(245,239,229,0.22)" strokeDasharray="8 12" />
            <path d="M900 150L820 510" stroke="rgba(245,239,229,0.22)" strokeDasharray="8 12" />
            <path d="M400 500L820 510" stroke="rgba(245,239,229,0.22)" strokeDasharray="8 12" />
            <circle cx="240" cy="190" r="12" fill="#7cf2c3" />
            <circle cx="900" cy="150" r="12" fill="#7cf2c3" />
            <circle cx="400" cy="500" r="12" fill="#7cf2c3" />
            <circle cx="820" cy="510" r="12" fill="#7cf2c3" />
          </svg>
          <div className="absolute bottom-10 left-10 right-10 rounded-[22px] border border-[rgba(245,239,229,0.08)] bg-[rgba(10,14,22,0.72)] p-5">
            <div className="flex flex-wrap gap-3">
              {['Content-addressed files', 'Client-side encryption', 'Distributed resilience'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[rgba(245,239,229,0.12)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[rgba(245,239,229,0.56)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
