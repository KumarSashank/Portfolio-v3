'use client'

import { contactData } from '@/lib/data'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Contact() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} id="contact" style={{ padding: 0 }}>
      {/* ── Vibrant orange block ── */}
      <div className="relative overflow-hidden bg-accent px-6 py-20 md:px-12 md:py-28 lg:py-32">
        {/* Noise grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Subtle ink radial at bottom-right */}
        <div className="pointer-events-none absolute bottom-0 right-0 h-[60%] w-[60%] rounded-full bg-[rgba(5,7,11,0.08)] blur-[120px]" />

        <div className="section-shell relative z-[1] text-center">
          {/* Label */}
          <div
            className="mb-6 inline-flex items-center justify-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-[rgba(5,7,11,0.55)]"
            data-reveal=""
          >
            <span className="block h-px w-10 bg-[rgba(5,7,11,0.35)]" />
            Let&apos;s Connect
            <span className="block h-px w-10 bg-[rgba(5,7,11,0.35)]" />
          </div>

          {/* Big headline */}
          <h2
            className="font-bold leading-[0.92] tracking-[-0.035em] text-ink"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(48px, 8vw, 110px)',
            }}
            data-reveal=""
            data-reveal-delay="1"
          >
            Got an idea?<br />
            Let&apos;s build{' '}
            <em
              style={{
                fontStyle: 'italic',
                color: 'transparent',
                WebkitTextStroke: '1.5px var(--ink)',
              }}
            >
              it.
            </em>
          </h2>

          {/* CTAs */}
          <div
            className="mt-14 flex flex-wrap items-center justify-center gap-4"
            data-reveal=""
            data-reveal-delay="2"
          >
            <a
              href={`mailto:${contactData.email}`}
              className="inline-flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-paper no-underline transition-opacity duration-200 hover:opacity-80"
            >
              Send Email
            </a>
            <a
              href={contactData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border-[1.5px] border-[rgba(5,7,11,0.5)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink no-underline transition-opacity duration-200 hover:opacity-60"
            >
              LinkedIn
            </a>
            <a
              href={contactData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border-[1.5px] border-[rgba(5,7,11,0.5)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink no-underline transition-opacity duration-200 hover:opacity-60"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* ── Dark footer bar ── */}
      <footer
        style={{
          background: 'var(--ink)',
          borderTop: '1px solid rgba(245,239,229,0.08)',
        }}
        className="px-6 py-8 md:px-12"
      >
        <div className="section-shell flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-[rgba(245,239,229,0.72)]">
            © {new Date().getFullYear()} Kumar Sashank. All rights reserved.
          </div>
          <div className="text-sm text-[rgba(245,239,229,0.55)]">
            Ontario, Canada <span className="mx-2 text-accent">✦</span> kumarsashank2003@gmail.com
          </div>
        </div>
      </footer>
    </section>
  )
}
