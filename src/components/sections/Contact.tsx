'use client'

import { contactData } from '@/lib/data'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Contact() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} id="contact" style={{ paddingTop: 'clamp(120px, 15vh, 250px)' }}>
      {/* ── Vibrant orange block ── */}
      <div 
        className="relative overflow-hidden bg-accent px-6 md:px-12"
        style={{ paddingTop: 'clamp(120px, 18vh, 240px)', paddingBottom: 'clamp(120px, 18vh, 240px)' }}
        data-cursor-color="white"
      >
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
            className="mb-8 lg:mb-12 inline-flex items-center justify-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[rgba(5,7,11,0.55)]"
            data-reveal=""
          >
            <span className="block h-px w-12 bg-[rgba(5,7,11,0.35)]" />
            Let&apos;s Connect
            <span className="block h-px w-12 bg-[rgba(5,7,11,0.35)]" />
          </div>

          {/* Big headline */}
          <h2
            className="font-bold leading-[0.9] tracking-[-0.04em] text-ink"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(56px, 10vw, 150px)',
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
                WebkitTextStroke: '2px var(--ink)',
              }}
            >
              it.
            </em>
          </h2>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
            style={{ marginTop: 'min(100px, 10vh)' }}
            data-reveal=""
            data-reveal-delay="2"
          >
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contactData.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-ink px-10 py-5 font-mono text-[13px] md:text-[14px] uppercase tracking-[0.18em] text-paper no-underline transition-transform duration-300 hover:scale-[1.05]"
            >
              Send Email
            </a>
            <a
              href={contactData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border-2 border-[rgba(5,7,11,0.5)] px-10 py-5 font-mono text-[13px] md:text-[14px] uppercase tracking-[0.18em] text-ink no-underline transition-all duration-300 hover:scale-[1.05] hover:border-ink hover:text-ink cursor-pointer"
            >
              LinkedIn
            </a>
            <a
              href={contactData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border-2 border-[rgba(5,7,11,0.5)] px-10 py-5 font-mono text-[13px] md:text-[14px] uppercase tracking-[0.18em] text-ink no-underline transition-all duration-300 hover:scale-[1.05] hover:border-ink hover:text-ink cursor-pointer"
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
